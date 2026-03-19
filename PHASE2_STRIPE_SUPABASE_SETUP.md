# MassageDeskOS Phase 2 Setup

## What Phase 2 includes

Phase 2 moves MassageDeskOS from:

- real Stripe checkout
- manual sales intake
- browser-local admin tracking

to:

- Stripe webhook ingestion
- shared Supabase sales records
- shared fulfillment tasks
- buyer entitlements
- owner dashboard backed by real database records

## Files added in this repo

- `supabase/config.toml`
- `supabase/migrations/20260313_massagedeskos_phase2.sql`
- `supabase/functions/stripe-webhook/index.ts`
- `src/lib/massagedeskosSalesApi.ts`

## Required secrets

You will need these before deploying the webhook:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_URL`
- `MASSAGEDESKOS_DEFAULT_OWNER_EMAIL`

Optional:

- `MASSAGEDESKOS_STARTER_PAYMENT_LINK_ID`
- `MASSAGEDESKOS_PROFESSIONAL_PAYMENT_LINK_ID`
- `MASSAGEDESKOS_STUDIO_PAYMENT_LINK_ID`

## Payment link IDs

The webhook can map plans from the actual paid amount:

- `14995` -> Starter
- `34995` -> Professional
- `74995` -> Studio

It can also use Stripe payment-link IDs if you want extra safety later, but they are no longer required for the first working Phase 2 launch.

Current public links:

- Starter: `https://buy.stripe.com/5kQ3cw4Oe1bt1nGcFNaZi00`
- Professional: `https://buy.stripe.com/00w28s3Ka07p6I0bBJaZi01`
- Studio: `https://buy.stripe.com/4gMaEY3Ka1bteas8pxaZi02`

You still need the internal Stripe payment-link IDs from the Stripe dashboard or API.

## Deploy order

### 1. Apply the SQL migration

Run the SQL in:

- `supabase/migrations/20260313_massagedeskos_phase2.sql`

This creates:

- `massagedeskos_sales`
- `massagedeskos_sale_tasks`
- `massagedeskos_buyer_entitlements`
- owner-only RLS policies
- buyer entitlement read policy

### 2. Deploy the edge function

Deploy:

- `stripe-webhook`

The function expects Stripe webhooks and writes sales + entitlements into Supabase.

### 3. Set function secrets

Set the required secrets listed above in Supabase Edge Functions.

### 4. Point Stripe webhook endpoint to Supabase

In Stripe, create a webhook endpoint for your deployed Supabase edge function URL.

Recommended events:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

### 5. Verify admin dashboard

Once the migration exists and the owner is signed in:

- the admin dashboard will load sales from Supabase
- if the tables are missing, it falls back to local browser storage

## Current live behavior

The deployed admin dashboard already tries the shared Supabase tables first.

So after you apply the migration:

- owner login stays the same
- the dashboard will start reading shared backend data automatically

## Important truth

Phase 2 code is now scaffolded in the repo, but it is not fully active until:

- the migration is applied
- the webhook function is deployed
- the Stripe webhook is created
- the function secrets are configured

Until then, the dashboard remains in fallback mode.
