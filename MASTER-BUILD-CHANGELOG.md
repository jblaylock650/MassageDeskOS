# MassageDeskOS Master Build Changelog

This document is the running owner-level history of major product-building work completed in this repository for MassageDeskOS. It is intended to capture meaningful build changes, launch work, operational hardening, documentation updates, and backend milestones.

This is not a raw git log. It is the human-readable build record.

## Changelog Structure

Each entry records:

- what changed
- why it mattered
- how it affected the product
- whether it changed public buyer behavior, owner operations, or backend readiness

## 2026-04-02

### Admin authentication stabilization

Changes:

- added stronger admin-session clearing path in [AuthContext.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/contexts/AuthContext.tsx)
- added `Reset this browser's stuck login session` to [admin login page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/admin/login/page.tsx)
- patched auth bootstrap to tolerate missing `profiles` resource in the MassageDeskOS Supabase project
- fixed a React hook-order crash in the admin login page that was causing a production failure after auth state changes

Why it mattered:

- owner login had become unstable in production
- stale browser sessions were causing repeated auth confusion
- the Supabase project did not expose `profiles` as expected
- the login page had a real runtime crash, not just a settings issue

Impact:

- admin auth is now much more resilient
- owner session recovery path exists on the live site
- app no longer hard-fails just because `profiles` is unavailable

### Documentation suite expansion

Changes:

- rewrote [README.md](C:/Users/jblay/Downloads/TheraLinkNetwork/README.md) into a full owner handbook
- created [MASTER-BUILD-CHANGELOG.md](C:/Users/jblay/Downloads/TheraLinkNetwork/MASTER-BUILD-CHANGELOG.md)
- created [BUILD-MILESTONES.md](C:/Users/jblay/Downloads/TheraLinkNetwork/BUILD-MILESTONES.md)

Why it mattered:

- the repo needed complete owner-grade documentation
- the product required a durable narrative of what had been built and why

Impact:

- the product now has a fuller documentation baseline for maintenance, handoff, and scaling

## 2026-04-01

### Entitlement-based buyer access hardening

Changes:

- replaced the earlier buyer-session stub model with Supabase-backed entitlement checks
- created [massagedeskosEntitlements.ts](C:/Users/jblay/Downloads/TheraLinkNetwork/src/lib/massagedeskosEntitlements.ts)
- updated [BuyerProtectedRoute.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/components/feature/BuyerProtectedRoute.tsx) to enforce active entitlement checks
- rebuilt [buyer login page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/login/page.tsx) to use real Supabase auth
- rebuilt [portal page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/portal/page.tsx) to resolve plan/access from entitlement state
- updated [success page.tsx](C:/Users/jblay/Downloads/TheraLinkNetwork/src/pages/massagedeskos/success/page.tsx) to reflect entitlement-processing state

Why it mattered:

- real paid access should not rely only on local browser flags
- the buyer portal needed to be materially closer to a hardened paid unlock path

Impact:

- buyer access became far more production-like
- plan-aware portal behavior improved
- the system now better supports real paid delivery

### Starter download delivery support

Changes:

- added Starter download asset at [MassageDeskOS-Starter-v8-Public-1.html](C:/Users/jblay/Downloads/TheraLinkNetwork/public/massagedeskos/downloads/MassageDeskOS-Starter-v8-Public-1.html)
- added `VITE_MASSAGEDESKOS_STARTER_DOWNLOAD_URL`
- updated [.env.example](C:/Users/jblay/Downloads/TheraLinkNetwork/.env.example)
- documented E2E validation in [STARTER_ENTITLEMENT_E2E_TEST_SCRIPT.md](C:/Users/jblay/Downloads/TheraLinkNetwork/STARTER_ENTITLEMENT_E2E_TEST_SCRIPT.md)

Why it mattered:

- Starter needed an optional concrete downloadable deliverable path
- release testing needed a real scripted validation path

Impact:

- Starter can now be delivered as hosted access plus optional download

### Admin login and password recovery

Changes:

- added owner-only admin login route
- added owner reset-password route
- added reset email path and recovery session completion handling
- improved Google account-selection behavior

Why it mattered:

- owners needed a real operational login and recovery path

Impact:

- admin access became substantially more usable, though later stability fixes were still required

### Stripe links wired to live pricing

Changes:

- mapped Stripe Payment Links to Starter, Professional, and Studio plans
- corrected plan-to-link mapping after initial mismatch

Why it mattered:

- live pricing needed to match real paid checkout routes

Impact:

- public pricing buttons now route to real payment links

## 2026-03-31

### MassageDeskOS identity separation from TheraLink

Changes:

- changed public root routing so the site presents MassageDeskOS rather than TheraLink
- updated metadata, page identity, and public product positioning
- moved the legacy TheraLink homepage off root and into a non-primary route

Why it mattered:

- MassageDeskOS is a separate sellable tool, not the same public product as TheraLink

Impact:

- public domain now correctly presents MassageDeskOS as its own product

### Buyer-facing sales funnel buildout

Changes:

- created public landing page
- created pricing page
- created buyer login/access page
- created buyer portal
- created success/cancel pages

Why it mattered:

- the product needed a real conversion path

Impact:

- MassageDeskOS became marketable as a sellable hosted product

### PWA packaging and installability

Changes:

- created hosted PWA packaging under `public/massagedeskos/`
- added manifest, service worker, install icons, and hosted app entry

Why it mattered:

- the product needed to feel like a real app, not just a plain HTML file

Impact:

- buyers can install MassageDeskOS as an app-like experience

### Demo mode restrictions

Changes:

- created timed demo route
- added countdown and demo banner
- blocked export/import/cloud sync/reset in demo
- added cooldown behavior

Why it mattered:

- public previews needed some guardrails against abuse or casual copying

Impact:

- demo became much better aligned with a sellable product funnel

### Surge deployment

Changes:

- prepared static build for Surge deployment
- created Surge deployment workflow
- launched `massagedeskos.surge.sh`

Why it mattered:

- the product needed to be live on the web as a hosted PWA and sales funnel

Impact:

- MassageDeskOS became accessible as a real hosted product

### GitHub repository creation and push

Changes:

- pushed the codebase to the dedicated GitHub repo:
  [https://github.com/jblaylock650/MassageDeskOS](https://github.com/jblaylock650/MassageDeskOS)

Why it mattered:

- the project needed its own repository and source-of-truth remote

Impact:

- version control and handoff readiness improved significantly

## Ongoing Changelog Rules

Update this file whenever there is a meaningful change to:

- sales funnel behavior
- pricing
- buyer access model
- admin operations
- deployment path
- PWA packaging
- Stripe routing
- Supabase backend
- documentation baseline

Do not use this file for tiny cosmetic edits unless they materially affect buyer experience, production behavior, or owner operations.
