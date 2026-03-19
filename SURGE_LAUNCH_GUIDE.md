# MassageDeskOS Surge Launch Guide

## Recommended free Surge URL

Use:

- `massagedeskos.surge.sh`

Important:

- URLs are lowercase in practice. "MassageDeskOS" as mixed-case branding is fine in copy, but the deploy target should be lowercase.
- For the free Surge launch, prefer the `surge.sh` subdomain because it includes SSL support and PWAs need a secure context.
- A custom domain on Surge may require paid SSL handling, so it is not the safest first choice for the installable PWA launch.

## What works on free Surge

- Public landing page
- Pricing page
- Hosted installable PWA
- Stripe Payment Link redirects
- Success and cancel pages
- Buyer portal UI

## What does not become secure just because it is on Surge

- Secret-key Stripe Checkout Session creation
- Webhook processing
- Secure paid entitlement checks
- Server-side account provisioning

For those, use Stripe + Supabase Edge Functions or another backend.

## Static-first launch mode

This repo is now prepared for a static launch where:

1. Buyers land on `/products/massagedeskos`
2. Buyers pick a plan on `/products/massagedeskos/pricing`
3. Plan buttons use Stripe Payment Links if configured
4. Buyers return to success or cancel pages
5. Buyers use the buyer portal and install the hosted PWA

## Environment variables to add

Add these to `.env` for real payment-link launch:

- `VITE_STRIPE_STARTER_PAYMENT_LINK`
- `VITE_STRIPE_PROFESSIONAL_PAYMENT_LINK`
- `VITE_STRIPE_STUDIO_PAYMENT_LINK`
- `VITE_MASSAGEDESKOS_SUPPORT_EMAIL`

Example:

```env
VITE_STRIPE_STARTER_PAYMENT_LINK="https://buy.stripe.com/exampleStarter"
VITE_STRIPE_PROFESSIONAL_PAYMENT_LINK="https://buy.stripe.com/exampleProfessional"
VITE_STRIPE_STUDIO_PAYMENT_LINK="https://buy.stripe.com/exampleStudio"
VITE_MASSAGEDESKOS_SUPPORT_EMAIL="support@yourdomain.com"
```

If you do not have Stripe links yet:

- leave those variables unset
- the pricing page will still work in preview mode
- buyers will be sent into the local buyer-access demo flow instead of real payment

## Build commands

Normal production build:

```powershell
npm.cmd run build
```

Surge-prepared build:

```powershell
$env:SURGE_DOMAIN="massagedeskos.surge.sh"
npm.cmd run build:surge
```

This creates:

- `out/200.html` for SPA routing on Surge
- `out/CNAME` with your Surge domain
- `out/massagedeskos-launch.json` for deployment diagnostics

## Publish commands

If `surge` is installed globally:

```powershell
surge ./out massagedeskos.surge.sh
```

If not installed yet:

```powershell
npm install -g surge
surge ./out massagedeskos.surge.sh
```

## Routes to verify after deploy

- `/`
- `/products/massagedeskos`
- `/products/massagedeskos/pricing`
- `/products/massagedeskos/login`
- `/products/massagedeskos/success`
- `/products/massagedeskos/cancel`
- `/buyers/massagedeskos`
- `/massagedeskos/`

## Best real production upgrade path

If you want secure customer access after payment, keep Surge for the frontend and add:

- Stripe Checkout or Payment Links
- Supabase Auth
- Supabase Edge Function for Stripe webhook handling
- A buyer entitlements table

That is the point where the buyer portal becomes truly protected instead of frontend-only.
