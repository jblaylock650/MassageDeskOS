# MassageDeskOS

MassageDeskOS is a sellable, installable, local-first practice-management product for massage therapists and independent wellness professionals. This repository is the full owner operating system for the product: the hosted Progressive Web App, the public sales funnel, Stripe checkout routing, buyer access flow, owner/admin dashboard, and the Supabase Phase 2 backend foundation.

This file is the master owner handbook for the entire product. It is written for the product owner, operators, future developers, and anyone responsible for maintaining, selling, fulfilling, or hardening MassageDeskOS.

## 1. Product Identity

- Product name: `MassageDeskOS`
- Company context: built by Juxtaposed Tides
- Product type: hosted installable PWA plus optional downloadable Starter asset
- Core market: solo massage therapists, mobile massage therapists, and small wellness providers
- Current live site: [https://massagedeskos.surge.sh](https://massagedeskos.surge.sh)
- GitHub repository: [https://github.com/jblaylock650/MassageDeskOS](https://github.com/jblaylock650/MassageDeskOS)

MassageDeskOS is positioned as:

- a one-time-purchase software product
- an installable tool rather than a noisy subscription platform
- a product that emphasizes buyer control over records and backups
- a product that avoids ad clutter, feed clutter, and recurring SaaS fatigue

## 2. Core Value Proposition

MassageDeskOS is designed to give therapists a cleaner way to operate their practice without being pushed into bloated software subscriptions. The product messaging and live buyer-facing copy currently emphasize:

- one-time purchase access
- long-term use of the purchased version
- local-first workflows
- buyer-controlled records and backups
- optional buyer-owned cloud sync
- no ad-heavy or distraction-heavy workspace design

This product is strongest when sold as a practical business tool that helps therapists manage:

- clients
- appointments
- visits
- therapist wellness
- self-care logging
- backup and restore
- optional Google Sheets sync

## 3. Commercial Offer Structure

MassageDeskOS is one core product sold in three commercial tiers. The app itself is fundamentally the same core product across all plans. What changes by plan is the level of service, onboarding, implementation, and customization around it.

Current tiers:

- `Starter License` - `$149.95`
- `Professional Setup` - `$349.95`
- `Studio Custom` - `$749.95`

Current live Stripe Payment Links:

- Starter: `https://buy.stripe.com/5kQ3cw4Oe1bt1nGcFNaZi00`
- Professional: `https://buy.stripe.com/00w28s3Ka07p6I0bBJaZi01`
- Studio: `https://buy.stripe.com/4gMaEY3Ka1bteas8pxaZi02`

Tier positioning:

- Starter = software access and self-serve guidance
- Professional = software access plus guided setup/onboarding
- Studio = software access plus custom implementation/customization

## 4. What Buyers Receive By Tier

### Starter License

Starter is the self-serve digital-product tier. The buyer is purchasing access to the core app, installable hosted PWA access, and guidance materials that help them begin using the product independently.

Starter currently includes:

- access to the hosted PWA
- install path into the live app
- backup/restore workflow
- product guide / quick-start material
- optional Starter download asset if configured

### Professional Setup

Professional is the recommended real-launch plan because it combines the core product with guided onboarding and setup support. The buyer is not purchasing a different app build; they are purchasing the same core product plus a smoother path into real use.

Professional currently includes:

- everything in Starter
- guided onboarding/setup path
- higher-touch buyer handling
- cloud sync setup checklist
- onboarding handoff communications

### Studio Custom

Studio is the highest-touch premium tier. It is the service-led plan built on top of the same core product, intended for customization, tailored implementation, and higher-touch launch support.

Studio currently includes:

- everything in Professional
- branded/customization path
- implementation planning
- higher-touch launch support

## 5. Repository Purpose

This repository is not just the app source. It is the product control center for MassageDeskOS. It currently contains:

- the public landing page
- the public pricing page
- post-checkout success/cancel pages
- buyer login and buyer portal
- owner/admin login and admin dashboard
- the hosted installable PWA
- demo mode restrictions
- Stripe link routing
- Supabase auth wiring
- Supabase Phase 2 sales and entitlement backend scaffolding
- owner operations documentation

## 6. High-Level Architecture

MassageDeskOS has four major operational layers:

### Public Sales Layer

Primary routes:

- `/`
- `/products/massagedeskos`
- `/products/massagedeskos/pricing`
- `/products/massagedeskos/success`
- `/products/massagedeskos/cancel`

### Product Delivery Layer

Primary routes:

- `/massagedeskos/`
- `/massagedeskos/?demo=1`
- `/massagedeskos/downloads/MassageDeskOS-Starter-v8-Public-1.html`

### Buyer Access Layer

Primary routes:

- `/products/massagedeskos/login`
- `/buyers/massagedeskos`

### Owner Operations Layer

Primary routes:

- `/products/massagedeskos/admin/login`
- `/products/massagedeskos/admin/reset-password`
- `/products/massagedeskos/admin`

## 7. Directory Map

Top-level structure:

- `src/` React app, routing, auth, funnel pages, portal, admin
- `public/` static product assets and hosted PWA files
- `public/massagedeskos/` hosted app shell and PWA resources
- `supabase/` migrations and edge functions
- `scripts/` build and deployment helpers
- `out/` generated static output for Surge deployment

Important top-level docs:

- [README.md](C:/Users/jblay/Downloads/TheraLinkNetwork/README.md)
- [MASTER-BUILD-CHANGELOG.md](C:/Users/jblay/Downloads/TheraLinkNetwork/MASTER-BUILD-CHANGELOG.md)
- [BUILD-MILESTONES.md](C:/Users/jblay/Downloads/TheraLinkNetwork/BUILD-MILESTONES.md)
- [MASSAGEDESKOS_OWNER_PIPELINE.md](C:/Users/jblay/Downloads/TheraLinkNetwork/MASSAGEDESKOS_OWNER_PIPELINE.md)
- [PHASE2_STRIPE_SUPABASE_SETUP.md](C:/Users/jblay/Downloads/TheraLinkNetwork/PHASE2_STRIPE_SUPABASE_SETUP.md)
- [SURGE_LAUNCH_GUIDE.md](C:/Users/jblay/Downloads/TheraLinkNetwork/SURGE_LAUNCH_GUIDE.md)
- [STARTER_ENTITLEMENT_E2E_TEST_SCRIPT.md](C:/Users/jblay/Downloads/TheraLinkNetwork/STARTER_ENTITLEMENT_E2E_TEST_SCRIPT.md)

## 8. Frontend Application Structure

Key frontend files and their roles:

- [src/router/config.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/router/config.tsx)
- [src/contexts/AuthContext.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/contexts/AuthContext.tsx)
- [src/lib/supabase.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/supabase.ts)
- [src/lib/massagedeskosAccess.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosAccess.ts)
- [src/lib/massagedeskosEntitlements.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosEntitlements.ts)
- [src/lib/massagedeskosAdmin.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosAdmin.ts)
- [src/lib/massagedeskosSalesApi.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosSalesApi.ts)
- [src/components/feature/BuyerProtectedRoute.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/components/feature/BuyerProtectedRoute.tsx)
- [src/components/feature/OwnerProtectedRoute.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/components/feature/OwnerProtectedRoute.tsx)

## 9. Public Funnel Pages

Files:

- [src/pages/massagedeskos/landing/page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/landing/page.tsx)
- [src/pages/massagedeskos/pricing/page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/pricing/page.tsx)
- [src/pages/massagedeskos/success/page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/success/page.tsx)
- [src/pages/massagedeskos/cancel/page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/cancel/page.tsx)

These pages are responsible for marketing, pricing, checkout routing, and post-payment direction into buyer access.

## 10. Hosted App / PWA

Primary files:

- [public/massagedeskos/index.html](C:/Users/jblay/Downloads/TheraLinkNetwork/public/massagedeskos/index.html)
- [public/massagedeskos/manifest.webmanifest](C:/Users/jblay/Downloads/TheraLinkNetwork/public/massagedeskos/manifest.webmanifest)
- [public/massagedeskos/sw.js](C:/Users/jblay/Downloads/TheraLinkNetwork/public/massagedeskos/sw.js)

Core app functions include:

- client management
- appointments
- recent visits
- calendar workflows
- therapist wellness
- self-care log
- reports
- optional cloud sync
- backup/export/restore

## 11. Demo Mode

Current behavior:

- triggered with `?demo=1`
- timed session
- cooldown after expiration
- demo data kept separate from real data
- export/import/cloud sync/full reset disabled
- visible banner and countdown

## 12. Buyer Access and Entitlements

Relevant files:

- [src/pages/massagedeskos/login/page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/login/page.tsx)
- [src/pages/massagedeskos/portal/page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/portal/page.tsx)
- [src/components/feature/BuyerProtectedRoute.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/components/feature/BuyerProtectedRoute.tsx)
- [src/lib/massagedeskosEntitlements.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosEntitlements.ts)

Current intended flow:

1. Buyer clicks plan CTA on pricing page.
2. Buyer completes payment via Stripe Payment Link.
3. Stripe redirects buyer to success page.
4. Stripe webhook writes sale + entitlement to Supabase.
5. Buyer creates/signs into account using the same email used at checkout.
6. Buyer portal checks for an active entitlement in Supabase.
7. Buyer is allowed into the portal if entitlement is active.
8. Buyer launches the hosted PWA from the portal.

Starter-only optional download behavior:

- if `VITE_MASSAGEDESKOS_STARTER_DOWNLOAD_URL` is configured
- and if the buyer has an active `starter` entitlement
- then the portal can show a download button for the Starter asset

## 13. Admin / Owner Access

Authorized owner emails:

- `jblaylock650@gmail.com`
- `juxtaposedtidesmedia@gmail.com`

Relevant files:

- [src/pages/massagedeskos/admin/login/page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/admin/login/page.tsx)
- [src/pages/massagedeskos/admin/reset-password/page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/admin/reset-password/page.tsx)
- [src/pages/massagedeskos/admin/page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/admin/page.tsx)
- [src/components/feature/OwnerProtectedRoute.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/components/feature/OwnerProtectedRoute.tsx)

Admin auth features currently implemented:

- email/password sign-in
- Google sign-in flow
- owner-email allowlist restriction
- password reset route
- hard local-session reset path

Admin dashboard functions:

- manual sales intake
- phase-aware remote sales loading
- local fallback storage if backend tables are unavailable
- stage updates
- fulfillment checklist tracking
- owner assignment
- sale deletion
- notes and flags

## 14. Sales Fulfillment Logic

Fulfillment templates are defined in [src/lib/massagedeskosAdmin.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosAdmin.ts).

Operational stages:

- `payment_received`
- `buyer_contacted`
- `portal_ready`
- `setup_scheduled`
- `fulfillment_in_progress`
- `delivered`
- `closed`

### Starter Fulfillment

Promise:

- fast digital delivery with clear buyer access and self-serve onboarding

Target window:

- same day or within 24 hours of confirmed payment

### Professional Fulfillment

Promise:

- guided onboarding plus assisted setup so the buyer launches confidently

Target window:

- initial outreach same day
- onboarding scheduled within 2 business days

### Studio Fulfillment

Promise:

- high-touch customization, implementation planning, and bespoke launch support

Target window:

- personal outreach same day
- scope alignment within 2 business days

## 15. Supabase Integration

Current frontend env points to:

- `https://lbecxsrilmxdrrrwmgqb.supabase.co`

Supabase is used for:

- auth
- buyer entitlements
- admin sales data
- webhook-backed payment state

Important current reality:

- this Supabase project does not currently expose the `profiles` REST resource in the same way the legacy app expected
- auth code has been patched to tolerate that
- future cleanup should either restore a proper `profiles` table and policies or fully remove legacy profile dependency from the broader app shell

## 16. Phase 2 Backend

Phase 2 is the backend foundation that connects Stripe sales to shared operational state.

Important files:

- [supabase/migrations/20260313_massagedeskos_phase2.sql](C:/Users/jblay/Downloads/TheraLinkNetwork/supabase/migrations/20260313_massagedeskos_phase2.sql)
- [supabase/functions/stripe-webhook/index.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/supabase/functions/stripe-webhook/index.ts)
- [src/lib/massagedeskosSalesApi.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosSalesApi.ts)
- [PHASE2_STRIPE_SUPABASE_SETUP.md](C:/Users/jblay/Downloads/TheraLinkNetwork/PHASE2_STRIPE_SUPABASE_SETUP.md)

Primary Phase 2 tables:

- `massagedeskos_sales`
- `massagedeskos_sale_tasks`
- `massagedeskos_buyer_entitlements`

Webhook event targets:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

Plan mapping by amount:

- `14995` -> `starter`
- `34995` -> `professional`
- `74995` -> `studio`

## 17. Environment Variables and Secrets

Frontend environment keys:

- `VITE_PUBLIC_SUPABASE_URL`
- `VITE_PUBLIC_SUPABASE_ANON_KEY`
- `VITE_STRIPE_STARTER_PAYMENT_LINK`
- `VITE_STRIPE_PROFESSIONAL_PAYMENT_LINK`
- `VITE_STRIPE_STUDIO_PAYMENT_LINK`
- `VITE_MASSAGEDESKOS_STARTER_DOWNLOAD_URL`
- `VITE_MASSAGEDESKOS_SUPPORT_EMAIL`

Supabase Edge Function secrets:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MASSAGEDESKOS_DEFAULT_OWNER_EMAIL`

Optional function secrets:

- `MASSAGEDESKOS_STARTER_PAYMENT_LINK_ID`
- `MASSAGEDESKOS_PROFESSIONAL_PAYMENT_LINK_ID`
- `MASSAGEDESKOS_STUDIO_PAYMENT_LINK_ID`

Security rules:

- never commit live secret keys
- never expose secret keys in frontend code
- rotate secrets if exposed outside a trusted admin context

## 18. Local Development

Install dependencies:

```powershell
npm install
```

Run development:

```powershell
npm run dev
```

Type-check:

```powershell
npm run type-check
```

Build production:

```powershell
npm run build
```

Build Surge output:

```powershell
npm run build:surge
```

## 19. Deployment

Static deployment target:

- `https://massagedeskos.surge.sh`

Build + publish:

```powershell
npm run build:surge
surge ./out massagedeskos.surge.sh
```

Relevant helper:

- [scripts/prepare-surge.mjs](C:/Users/jblay/Downloads/TheraLinkNetwork/scripts/prepare-surge.mjs)

## 20. Quality Assurance

Every release should be checked against:

- landing page loads and CTA paths work
- pricing card links match Stripe products
- success/cancel routing works
- buyer login accepts the correct paid email
- buyer portal unlocks only with active entitlement
- Starter download appears only when configured and valid
- demo timer and restrictions work
- admin login works for owner accounts
- password reset flow completes successfully
- admin dashboard loads sales data
- webhook endpoint is deployed
- Supabase tables exist and accept data
- live PWA installs and opens

Detailed E2E doc:

- [STARTER_ENTITLEMENT_E2E_TEST_SCRIPT.md](C:/Users/jblay/Downloads/TheraLinkNetwork/STARTER_ENTITLEMENT_E2E_TEST_SCRIPT.md)

## 21. Known Risks and Active Hardening Priorities

Current high-priority concerns:

- ensure buyer entitlement flow is fully reliable in production
- continue removing leftover assumptions from the older app shell
- decide whether to fully restore or fully eliminate `profiles` dependency
- keep admin auth stable across browser privacy behaviors
- monitor Supabase usage limits
- tighten Studio scope boundaries before broader sales

## 22. Operational Truths For The Owner

- This is a real sellable product, not just a code prototype.
- The hosted PWA is the primary buyer-facing product experience.
- The admin dashboard is the owner operating console for sales and fulfillment.
- The Stripe links are real and mapped to live prices.
- The buyer-access flow is entitlement-driven.
- The repository still contains some legacy app structure from earlier work, so future cleanup should continue separating MassageDeskOS concerns from older assumptions.

## 23. Recommended Ongoing Maintenance Workflow

For every production change:

1. Update code.
2. Build locally.
3. Verify the affected route or flow.
4. Publish to Surge.
5. Update `MASTER-BUILD-CHANGELOG.md`.
6. Update `BUILD-MILESTONES.md` if the change is milestone-worthy.
7. Update this `README.md` if the change affects product behavior, routing, pricing, backend, deployment, or owner operations.

## 24. Related Documentation

- [MASTER-BUILD-CHANGELOG.md](C:/Users/jblay/Downloads/TheraLinkNetwork/MASTER-BUILD-CHANGELOG.md)
- [BUILD-MILESTONES.md](C:/Users/jblay/Downloads/TheraLinkNetwork/BUILD-MILESTONES.md)
- [MASSAGEDESKOS_OWNER_PIPELINE.md](C:/Users/jblay/Downloads/TheraLinkNetwork/MASSAGEDESKOS_OWNER_PIPELINE.md)
- [PHASE2_STRIPE_SUPABASE_SETUP.md](C:/Users/jblay/Downloads/TheraLinkNetwork/PHASE2_STRIPE_SUPABASE_SETUP.md)
- [SURGE_LAUNCH_GUIDE.md](C:/Users/jblay/Downloads/TheraLinkNetwork/SURGE_LAUNCH_GUIDE.md)
- [STARTER_ENTITLEMENT_E2E_TEST_SCRIPT.md](C:/Users/jblay/Downloads/TheraLinkNetwork/STARTER_ENTITLEMENT_E2E_TEST_SCRIPT.md)

## 25. Final Owner Statement

This repository is the current canonical source of truth for MassageDeskOS as a product, a deployable app, a buyer funnel, an owner operations system, and a backend-enabled sales workflow. If a future owner, developer, or operator needs to understand what MassageDeskOS is, how it is sold, how it is fulfilled, how it is deployed, and what still needs hardening, they should be able to start here and work outward from this document.
