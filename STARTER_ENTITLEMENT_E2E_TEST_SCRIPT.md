# Starter Entitlement E2E Test Script

This script verifies the hardened production flow:

`Stripe payment success -> Supabase entitlement record -> buyer login -> portal unlock`

Use this as a release-gate checklist before public launch updates.

## Scope

System under test:

- Pricing + Stripe checkout handoff
- Webhook ingestion
- `massagedeskos_buyer_entitlements` record creation
- Buyer auth + entitlement validation
- Buyer portal unlock
- Starter download visibility for Starter entitlement

Target environment:

- Live domain: `https://massagedeskos.surge.sh`
- Supabase project: `lbecxsrilmxdrrrwmgqb`

## Preconditions

- Stripe payment links are live and mapped correctly
- Supabase migration is applied
- `stripe-webhook` edge function is deployed
- webhook secrets are configured
- Stripe webhook endpoint includes:
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- Frontend env contains:
- `VITE_MASSAGEDESKOS_STARTER_DOWNLOAD_URL=/massagedeskos/downloads/MassageDeskOS-Starter-v8-Public-1.html`

## Test Account Convention

Use unique test emails each run:

- Example: `starter.e2e.<timestamp>@yourdomain.com`

## A) Zero-Cost Validation Path (No Live Charge)

Use this path when you cannot run a paid live checkout.

### A1. Insert mock entitlement via SQL

In Supabase SQL Editor, run:

```sql
insert into public.massagedeskos_sales (
  checkout_session_id,
  stripe_customer_email,
  buyer_name,
  plan_id,
  amount_total,
  currency,
  payment_status,
  fulfillment_status,
  owner_assignee,
  purchased_at
) values (
  'starter-e2e-manual-' || floor(extract(epoch from now()))::text,
  'starter.e2e.manual@example.com',
  'Starter E2E Manual',
  'starter',
  14995,
  'usd',
  'paid',
  'payment_received',
  'jblaylock650@gmail.com',
  timezone('utc', now())
)
returning id;
```

Then create entitlement for that sale ID:

```sql
insert into public.massagedeskos_buyer_entitlements (
  sale_id,
  buyer_email,
  plan_id,
  status,
  portal_url
)
select
  id,
  'starter.e2e.manual@example.com',
  'starter',
  'active',
  '/buyers/massagedeskos'
from public.massagedeskos_sales
where stripe_customer_email = 'starter.e2e.manual@example.com'
order by purchased_at desc
limit 1;
```

### A2. Buyer login + portal gate

1. Go to `/products/massagedeskos/login`
2. Click `Create Buyer Account`
3. Use `starter.e2e.manual@example.com`
4. Submit account creation
5. Expect redirect to `/buyers/massagedeskos`

Pass criteria:

- No entitlement error
- Portal opens
- Plan shows `Starter License`
- `Download Starter File` button is visible

## B) Full Live Payment Path (Strict Production)

Use this only when you can run a real payment.

### B1. Start from pricing

1. Go to `/products/massagedeskos/pricing`
2. Click `Buy Starter`
3. Confirm redirect to Stripe starter link

Pass criteria:

- Redirect lands on Starter checkout (not Professional/Studio)

### B2. Complete Stripe payment

1. Complete checkout with buyer email `starter.e2e.<timestamp>@...`
2. Ensure success URL returns to `/products/massagedeskos/success`

Pass criteria:

- Success page loads
- Success message shows entitlement-processing guidance

### B3. Verify webhook ingestion

In Supabase SQL Editor, run:

```sql
select
  checkout_session_id,
  stripe_customer_email,
  plan_id,
  amount_total,
  payment_status,
  purchased_at
from public.massagedeskos_sales
where stripe_customer_email = 'starter.e2e.YOUR_TIMESTAMP@YOUR_DOMAIN.com'
order by purchased_at desc
limit 1;
```

Expected:

- `plan_id = 'starter'`
- `amount_total = 14995`
- `payment_status = 'paid'` (or succeeded equivalent)

Then verify entitlement:

```sql
select
  buyer_email,
  plan_id,
  status,
  access_granted_at
from public.massagedeskos_buyer_entitlements
where buyer_email = 'starter.e2e.YOUR_TIMESTAMP@YOUR_DOMAIN.com'
order by access_granted_at desc
limit 1;
```

Expected:

- one row exists
- `plan_id = 'starter'`
- `status = 'active'`

### B4. Buyer login and unlock

1. Go to `/products/massagedeskos/login`
2. Create account or sign in with exact checkout email
3. Submit

Pass criteria:

- Entitlement verified
- Redirect to `/buyers/massagedeskos`
- Plan displayed as `Starter License`
- Starter download button visible

## C) Negative Tests (Required)

### C1. Wrong email denied

1. Sign in with an email that has no entitlement
2. Try to open `/buyers/massagedeskos`

Expected:

- Redirect back to buyer login
- Message indicates entitlement is required

### C2. Revoked entitlement denied

1. Set entitlement status to `revoked` in Supabase
2. Re-sign in with that email

Expected:

- Portal denied
- Redirect to buyer login

### C3. Pending entitlement handling

1. Set entitlement status to `pending`
2. Re-sign in with that email

Expected:

- Portal denied until active
- buyer sees actionable login/access guidance

## D) Final Release Gate

Mark release as pass only if all are true:

- Starter checkout routes correctly
- Sale row written in `massagedeskos_sales`
- Entitlement row written in `massagedeskos_buyer_entitlements`
- Buyer auth works with checkout email
- Portal unlocks only for active entitlement
- Starter download link appears for Starter only
- Non-entitled user is blocked every time

## E) Quick Troubleshooting

If entitlement does not appear:

- check Stripe webhook endpoint URL
- check webhook signing secret in Supabase function secrets
- check webhook events subscribed in Stripe
- inspect Supabase Edge Function logs for `stripe-webhook`

If buyer still blocked with valid payment:

- confirm the exact email used at checkout matches login email
- verify entitlement `status = active`
- verify `plan_id` and email casing (system stores lowercase)

If Starter download button is missing:

- confirm entitlement plan is `starter`
- confirm env has `VITE_MASSAGEDESKOS_STARTER_DOWNLOAD_URL`
- rebuild + republish after env change
