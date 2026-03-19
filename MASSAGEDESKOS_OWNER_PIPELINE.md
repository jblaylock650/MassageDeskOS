# MassageDeskOS Owner Pipeline

## Current launch model

MassageDeskOS is currently sold through:

- public landing page
- public pricing page
- Stripe Payment Links
- customer success page
- buyer portal flow
- owner-only admin operations panel

This launch is live on static Surge hosting. That means:

- checkout is real
- fulfillment can be managed in the app
- owner access can be protected through Supabase auth allowlisting
- automatic Stripe-to-admin sale ingestion is not live yet

At this phase, every sale must be confirmed in Stripe and then entered into the owner dashboard manually.

## Live pricing map

- Starter License: `$149.95`
- Professional Setup: `$349.95`
- Studio Custom: `$749.95`

## Stripe link map

- Starter: `https://buy.stripe.com/5kQ3cw4Oe1bt1nGcFNaZi00`
- Professional: `https://buy.stripe.com/00w28s3Ka07p6I0bBJaZi01`
- Studio: `https://buy.stripe.com/4gMaEY3Ka1bteas8pxaZi02`

## Owner access

The owner dashboard is reserved for:

- `jblaylock650@gmail.com`
- `juxtaposedtidesmedia@gmail.com`

Recommended owner route:

- `/products/massagedeskos/admin/login`
- `/products/massagedeskos/admin`

## Sale handling workflow

### 1. Stripe confirmation

When a payment hits Stripe:

- open Stripe dashboard
- confirm the product and amount
- confirm buyer email
- confirm payment status is successful
- confirm which tier was purchased

### 2. Admin intake

Immediately create a sale record in the owner dashboard with:

- buyer name
- buyer email
- business/practice name
- plan tier
- owner assigned
- purchase date
- due date
- notes or special requests

### 3. Move the sale through the stage pipeline

Available stages:

- `Payment Received`
- `Buyer Contacted`
- `Portal Ready`
- `Setup Scheduled`
- `Fulfillment In Progress`
- `Delivered`
- `Closed`

### 4. Complete the plan checklist

Each tier has a built-in fulfillment checklist in the admin panel.

## Tier SOP

### Starter License

Goal:

- fast digital delivery
- buyer gets access quickly
- minimal hands-on support

Standard process:

- confirm payment
- create buyer portal record
- send buyer access email
- point buyer to hosted app + quick-start guide
- confirm delivery

Target:

- same day or inside 24 hours

### Professional Setup

Goal:

- buyer gets install help and structured onboarding

Standard process:

- confirm payment
- send welcome email
- collect setup details
- schedule onboarding/setup session
- walk through install, backups, and first use
- complete setup notes

Target:

- first outreach same day
- onboarding scheduled within 2 business days

### Studio Custom

Goal:

- deliver white-label/custom implementation with higher-touch service

Standard process:

- confirm payment
- send premium welcome email
- collect brand/scope assets
- run discovery call
- build implementation plan
- deliver custom version
- complete handoff and approval

Target:

- first outreach same day
- scope alignment within 2 business days

## What is production-ready now

- public site
- installable PWA
- timed public demo
- live Stripe checkout links
- owner-only admin panel
- manual sales intake
- manual fulfillment tracking

## What still requires phase 2 backend work

- automatic Stripe sale ingestion
- Stripe webhook processing
- server-verified entitlements
- buyer access auto-provisioning after payment
- centralized shared admin data across browsers/devices

## Recommended next backend milestone

To make the sales/admin system truly end-to-end:

- create Supabase tables for sales, fulfillment tasks, and buyer entitlements
- add a Stripe webhook receiver
- write successful Stripe payments into Supabase
- automatically assign the plan tier
- automatically unlock the buyer portal
- let the owner dashboard read real shared sales data
