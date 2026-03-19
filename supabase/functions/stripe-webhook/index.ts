import Stripe from 'https://esm.sh/stripe@14?target=denonext';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2024-11-20',
});

const cryptoProvider = Stripe.createSubtleCryptoProvider();

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  {
    auth: { persistSession: false },
  },
);

const planFromPaymentLink = new Map<string, 'starter' | 'professional' | 'studio'>([
  [Deno.env.get('MASSAGEDESKOS_STARTER_PAYMENT_LINK_ID') ?? '', 'starter'],
  [Deno.env.get('MASSAGEDESKOS_PROFESSIONAL_PAYMENT_LINK_ID') ?? '', 'professional'],
  [Deno.env.get('MASSAGEDESKOS_STUDIO_PAYMENT_LINK_ID') ?? '', 'studio'],
]);

const planFromAmount = new Map<number, 'starter' | 'professional' | 'studio'>([
  [14995, 'starter'],
  [34995, 'professional'],
  [74995, 'studio'],
]);

const ownerEmail = Deno.env.get('MASSAGEDESKOS_DEFAULT_OWNER_EMAIL') || 'jblaylock650@gmail.com';

const fulfillmentTemplates: Record<'starter' | 'professional' | 'studio', string[]> = {
  starter: [
    'Confirm payment in Stripe dashboard',
    'Create buyer portal record and verify plan tier',
    'Send buyer access email with portal link and quick-start guide',
    'Confirm buyer can open hosted PWA and install it',
    'Mark delivery complete and archive notes',
  ],
  professional: [
    'Confirm payment in Stripe dashboard',
    'Send welcome email with scheduling link and portal access',
    'Collect buyer setup details, preferred browser/device, and Google sync intent',
    'Schedule onboarding or setup session',
    'Walk buyer through install, backups, and first records',
    'Document setup completion and next support actions',
  ],
  studio: [
    'Confirm payment and verify custom scope expectations',
    'Send premium welcome email and request branding/customization assets',
    'Run discovery call covering workflow changes, branding, and delivery plan',
    'Create internal implementation notes and milestone dates',
    'Deliver custom build and walkthrough',
    'Collect launch approval and close out final support items',
  ],
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function paymentLinkIdFromSession(session: Stripe.Checkout.Session) {
  return typeof session.payment_link === 'string' ? session.payment_link : session.payment_link?.id ?? '';
}

function normalizePlan(session: Stripe.Checkout.Session) {
  const paymentLinkId = paymentLinkIdFromSession(session);
  const mappedPlan = planFromPaymentLink.get(paymentLinkId);

  if (mappedPlan) {
    return mappedPlan;
  }

  const amountPlan = planFromAmount.get(session.amount_total ?? 0);
  if (amountPlan) {
    return amountPlan;
  }

  const planHint = session.metadata?.plan_id?.toLowerCase();
  if (planHint === 'starter' || planHint === 'professional' || planHint === 'studio') {
    return planHint;
  }

  return 'starter';
}

async function upsertSaleTasks(saleId: string, planId: 'starter' | 'professional' | 'studio') {
  const tasks = fulfillmentTemplates[planId].map((label, index) => ({
    sale_id: saleId,
    task_key: label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    label,
    owner_hint: 'Owner',
    sort_order: index,
  }));

  await supabase.from('massagedeskos_sale_tasks').delete().eq('sale_id', saleId);
  const { error } = await supabase.from('massagedeskos_sale_tasks').insert(tasks);
  if (error) {
    throw error;
  }
}

async function upsertEntitlement(saleId: string, email: string, planId: 'starter' | 'professional' | 'studio') {
  const { error } = await supabase.from('massagedeskos_buyer_entitlements').upsert(
    {
      sale_id: saleId,
      buyer_email: email,
      plan_id: planId,
      status: 'active',
      portal_url: '/buyers/massagedeskos',
    },
    {
      onConflict: 'sale_id',
    },
  );

  if (error) {
    throw error;
  }
}

async function handleCheckoutSession(sessionId: string, eventId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer'],
  });

  if (session.payment_status === 'unpaid') {
    return;
  }

  const buyerEmail = session.customer_details?.email || session.customer_email;
  if (!buyerEmail) {
    throw new Error('Stripe session does not include a buyer email.');
  }

  const planId = normalizePlan(session);
  const paymentLinkId = paymentLinkIdFromSession(session);
  const paymentIntentId = typeof session.payment_intent === 'string'
    ? session.payment_intent
    : session.payment_intent?.id ?? null;

  const salePayload = {
    stripe_event_id: eventId,
    checkout_session_id: session.id,
    payment_intent_id: paymentIntentId,
    payment_link_id: paymentLinkId || null,
    payment_link_url: paymentLinkId ? `https://dashboard.stripe.com/payment-links/${paymentLinkId}` : null,
    stripe_customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null,
    stripe_customer_email: buyerEmail.toLowerCase(),
    buyer_name: session.customer_details?.name || null,
    plan_id: planId,
    amount_total: session.amount_total ?? 0,
    currency: session.currency ?? 'usd',
    payment_status: session.payment_status ?? 'paid',
    fulfillment_status: 'payment_received',
    owner_assignee: ownerEmail,
    portal_access_sent: false,
    payment_confirmed: true,
    intake_captured: true,
    purchased_at: new Date((session.created ?? Date.now() / 1000) * 1000).toISOString(),
    metadata: {
      stripe_customer_details: session.customer_details,
      client_reference_id: session.client_reference_id,
      payment_link_id: paymentLinkId,
    },
  };

  const { data: sale, error } = await supabase
    .from('massagedeskos_sales')
    .upsert(salePayload, { onConflict: 'checkout_session_id' })
    .select('id')
    .single();

  if (error || !sale) {
    throw error ?? new Error('Failed to upsert sale record.');
  }

  await upsertSaleTasks(sale.id, planId);
  await upsertEntitlement(sale.id, buyerEmail.toLowerCase(), planId);
}

Deno.serve(async request => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const signature = request.headers.get('Stripe-Signature');
  if (!signature) {
    return json({ error: 'Missing Stripe-Signature header' }, 400);
  }

  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  if (!webhookSecret) {
    return json({ error: 'Missing STRIPE_WEBHOOK_SECRET' }, 500);
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider,
    );
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Invalid webhook signature' }, 400);
  }

  try {
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSession(session.id, event.id);
    }

    if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await supabase
        .from('massagedeskos_sales')
        .update({
          payment_status: 'failed',
          fulfillment_status: 'payment_received',
        })
        .eq('checkout_session_id', session.id);
    }
  } catch (error) {
    console.error('Stripe webhook processing failed', error);
    return json({ error: error instanceof Error ? error.message : 'Webhook processing failed' }, 500);
  }

  return json({ received: true });
});
