# MassageDeskOS Owner Handbook

This document is the owner-level source of truth for the `MassageDeskOS` product, codebase, launch flow, sales funnel, admin operations, and deployment pipeline.

## 1) Product Summary

`MassageDeskOS` is a local-first, installable web app (PWA) designed for massage therapists and independent wellness providers to manage:

- client records
- appointments
- visit logs
- therapist wellness and self-care tracking
- data backup and restore workflows

Core commercial position:

- one-time purchase tiers
- no mandatory recurring subscription for the purchased version
- buyer-controlled records and backup process
- no ad-heavy, feed-cluttered workflow design

## 2) Commercial Tiers

Current tier names and list prices shown in app copy:

- `Starter License` (`$149.95`)
- `Professional Setup` (`$349.95`)
- `Studio Custom` (`$749.95`)

Current Stripe Payment Links configured:

- Starter: `https://buy.stripe.com/5kQ3cw4Oe1bt1nGcFNaZi00`
- Professional: `https://buy.stripe.com/00w28s3Ka07p6I0bBJaZi01`
- Studio: `https://buy.stripe.com/4gMaEY3Ka1bteas8pxaZi02`

Current owner-operations docs reference:

- [MASSAGEDESKOS_OWNER_PIPELINE.md](C:/Users/jblay/Downloads/TheraLinkNetwork/MASSAGEDESKOS_OWNER_PIPELINE.md)

## 3) What Is In This Repo

Top-level directories and purpose:

- `src/` React app (sales funnel, buyer portal, admin panel, auth, routing)
- `public/massagedeskos/` hosted PWA app files
- `supabase/` migration + edge function for Phase 2 backend
- `scripts/` deployment/build helper scripts

Key owner docs:

- [MASSAGEDESKOS_OWNER_PIPELINE.md](C:/Users/jblay/Downloads/TheraLinkNetwork/MASSAGEDESKOS_OWNER_PIPELINE.md)
- [PHASE2_STRIPE_SUPABASE_SETUP.md](C:/Users/jblay/Downloads/TheraLinkNetwork/PHASE2_STRIPE_SUPABASE_SETUP.md)
- [SURGE_LAUNCH_GUIDE.md](C:/Users/jblay/Downloads/TheraLinkNetwork/SURGE_LAUNCH_GUIDE.md)
- [STARTER_ENTITLEMENT_E2E_TEST_SCRIPT.md](C:/Users/jblay/Downloads/TheraLinkNetwork/STARTER_ENTITLEMENT_E2E_TEST_SCRIPT.md)

## 4) Sales Funnel Routes

Public buyer-facing pages:

- `/products/massagedeskos` landing page
- `/products/massagedeskos/pricing` pricing + plan comparison
- `/products/massagedeskos/success` post-checkout success
- `/products/massagedeskos/cancel` post-checkout cancel
- `/products/massagedeskos/login` buyer access/login flow
- `/buyers/massagedeskos` buyer portal

Hosted app/PWA:

- `/massagedeskos/` full app
- `/massagedeskos/?demo=1` timed public demo

Owner/admin pages:

- `/products/massagedeskos/admin/login`
- `/products/massagedeskos/admin`
- `/products/massagedeskos/admin/reset-password`

## 5) PWA and Demo Mode

PWA files:

- [index.html](C:/Users/jblay/Downloads/TheraLinkNetwork/public/massagedeskos/index.html)
- [manifest.webmanifest](C:/Users/jblay/Downloads/TheraLinkNetwork/public/massagedeskos/manifest.webmanifest)
- [sw.js](C:/Users/jblay/Downloads/TheraLinkNetwork/public/massagedeskos/sw.js)

Demo mode behaviors currently implemented:

- launched with `?demo=1`
- 15-minute session limit
- cooldown lockout per browser after session use
- demo-specific storage keys
- export/import/cloud sync/full reset disabled in demo
- upgrade CTA to pricing page

## 6) Buyer Access Model (Current State)

Current implementation has two layers:

- Stripe payment links for real checkout
- buyer portal access logic currently includes a local session stub flow

Buyer portal guard is in:

- [BuyerProtectedRoute.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/components/feature/BuyerProtectedRoute.tsx)

Plan/session logic is in:

- [massagedeskosAccess.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosAccess.ts)

Important owner truth:

- the backend entitlement model exists in Phase 2 scaffolding
- full server-verified buyer entitlement UX should remain a top production-hardening priority

## 7) Admin Model

Owner email allowlist:

- `jblaylock650@gmail.com`
- `juxtaposedtidesmedia@gmail.com`

Owner/admin logic:

- [massagedeskosAdmin.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosAdmin.ts)
- [OwnerProtectedRoute.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/components/feature/OwnerProtectedRoute.tsx)
- [admin page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/admin/page.tsx)

Admin board supports:

- manual sale intake
- plan-based SOP checklists
- assignment and pipeline stages
- fulfillment flags
- notes and task tracking

## 8) Phase 2 Backend (Stripe + Supabase)

Phase 2 components:

- SQL migration: [20260313_massagedeskos_phase2.sql](C:/Users/jblay/Downloads/TheraLinkNetwork/supabase/migrations/20260313_massagedeskos_phase2.sql)
- webhook function: [stripe-webhook/index.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/supabase/functions/stripe-webhook/index.ts)
- admin sales API: [massagedeskosSalesApi.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosSalesApi.ts)

Created tables:

- `massagedeskos_sales`
- `massagedeskos_sale_tasks`
- `massagedeskos_buyer_entitlements`

Webhook events handled:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

Plan mapping in webhook:

- amount `14995` -> `starter`
- amount `34995` -> `professional`
- amount `74995` -> `studio`

Phase 2 setup guide:

- [PHASE2_STRIPE_SUPABASE_SETUP.md](C:/Users/jblay/Downloads/TheraLinkNetwork/PHASE2_STRIPE_SUPABASE_SETUP.md)

## 9) Environment Variables

Frontend (`.env`) keys used by app:

- `VITE_PUBLIC_SUPABASE_URL`
- `VITE_PUBLIC_SUPABASE_ANON_KEY`
- `VITE_STRIPE_STARTER_PAYMENT_LINK`
- `VITE_STRIPE_PROFESSIONAL_PAYMENT_LINK`
- `VITE_STRIPE_STUDIO_PAYMENT_LINK`
- `VITE_MASSAGEDESKOS_STARTER_DOWNLOAD_URL` (optional, Starter-only download button)
- `VITE_MASSAGEDESKOS_SUPPORT_EMAIL` (optional)

Edge function secrets (Supabase):

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MASSAGEDESKOS_DEFAULT_OWNER_EMAIL`

Optional edge-function mapping secrets:

- `MASSAGEDESKOS_STARTER_PAYMENT_LINK_ID`
- `MASSAGEDESKOS_PROFESSIONAL_PAYMENT_LINK_ID`
- `MASSAGEDESKOS_STUDIO_PAYMENT_LINK_ID`

Security note:

- never commit secret keys to git
- never expose secret keys in frontend bundles

## 10) Local Development

Install dependencies:

```powershell
npm install
```

Run dev server:

```powershell
npm run dev
```

Type-check:

```powershell
npm run type-check
```

Build:

```powershell
npm run build
```

Build for Surge static output:

```powershell
npm run build:surge
```

## 11) Deployment

Current public host:

- `https://massagedeskos.surge.sh`

Surge publish flow:

```powershell
npm run build:surge
surge ./out massagedeskos.surge.sh
```

Detailed runbook:

- [SURGE_LAUNCH_GUIDE.md](C:/Users/jblay/Downloads/TheraLinkNetwork/SURGE_LAUNCH_GUIDE.md)

## 12) Owner Operations SOP

Operational stages used by admin pipeline:

- `Payment Received`
- `Buyer Contacted`
- `Portal Ready`
- `Setup Scheduled`
- `Fulfillment In Progress`
- `Delivered`
- `Closed`

Starter target:

- same day to 24-hour delivery

Professional target:

- outreach same day
- onboarding scheduled within 2 business days

Studio target:

- personal outreach same day
- scope alignment within 2 business days

Full SOP reference:

- [MASSAGEDESKOS_OWNER_PIPELINE.md](C:/Users/jblay/Downloads/TheraLinkNetwork/MASSAGEDESKOS_OWNER_PIPELINE.md)

## 13) QA Checklist (Owner Release Gate)

Before public launch or major update, verify:

- landing page loads and CTA routes are correct
- pricing page buttons map to correct Stripe links
- success/cancel URLs return expected pages
- demo mode starts, counts down, and restrictions hold
- hosted PWA installs on desktop and mobile
- buyer portal opens and app links resolve
- admin login works for owner emails
- admin pipeline updates persist correctly
- Supabase migration tables exist in production project
- webhook endpoint receives Stripe events
- at least one end-to-end purchase event is captured in `massagedeskos_sales`
- no secrets are present in committed code

## 14) Privacy and Data Positioning Notes

Buyer-facing positioning in current sales copy emphasizes:

- one-time purchase model
- long-term use of purchased version
- no recurring subscription fatigue
- buyer control of records/backups
- no ad-cluttered workflow design

Owner compliance note:

- avoid legal/compliance claims not formally certified
- use accurate language: local-first, buyer-controlled backup, optional buyer-owned sync

## 15) Known Gaps / Active Priorities

Priority hardening items:

- keep buyer entitlement UX fully server-verified end-to-end
- keep public pricing display in perfect alignment with actual Stripe charging format
- continue tightening Studio scope boundaries in public copy and internal process
- maintain clear deliverable boundaries per tier to avoid fulfillment drift

## 16) Git and Repository

GitHub remote:

- `https://github.com/jblaylock650/MassageDeskOS.git`

Current default branch:

- `main`

## 17) Quick Owner Command Reference

Build and publish:

```powershell
npm run build:surge
surge ./out massagedeskos.surge.sh
```

Push code:

```powershell
git add .
git commit -m "your message"
git push origin main
```

Deploy Supabase function:

```powershell
npx supabase functions deploy stripe-webhook --project-ref lbecxsrilmxdrrrwmgqb --no-verify-jwt
```

## 18) Final Owner Notes

This repository is now the operating center for:

- product experience
- sales funnel
- checkout routing
- buyer portal
- owner admin operations
- backend evolution into automated fulfillment

Use this file as the canonical owner handbook and keep it current whenever sales flow, pricing, deployment, authentication, or fulfillment process changes.
