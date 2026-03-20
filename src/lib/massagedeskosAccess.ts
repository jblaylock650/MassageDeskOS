export type MassageDeskPlanId = 'starter' | 'professional' | 'studio';

export interface MassageDeskPlan {
  id: MassageDeskPlanId;
  name: string;
  price: string;
  tagline: string;
  cta: string;
  summary: string;
  features: string[];
  paymentLink?: string;
}

const PENDING_PLAN_KEY = 'massagedeskosPendingPlan';
const OWNER_PREVIEW_KEY = 'massagedeskosOwnerPreview';
const OWNER_PREVIEW_PLAN_KEY = 'massagedeskosOwnerPreviewPlan';

export const productInfo = {
  name: 'MassageDeskOS v8 Public Version 1',
  shortName: 'MassageDeskOS Pro',
  installUrl: '/massagedeskos/',
  demoUrl: '/massagedeskos/?demo=1',
  supportEmail: import.meta.env.VITE_MASSAGEDESKOS_SUPPORT_EMAIL || 'support@massagedeskos.app',
  starterDownloadUrl: import.meta.env.VITE_MASSAGEDESKOS_STARTER_DOWNLOAD_URL || '',
};

export const plans: MassageDeskPlan[] = [
  {
    id: 'starter',
    name: 'Starter License',
    price: '$149.95',
    tagline: 'Best for solo therapists',
    cta: 'Buy Starter',
    summary: 'One-time access to the installable PWA, quick-start materials, and backup workflow guidance.',
    features: [
      'Installable browser app',
      'Local-first client and schedule tracking',
      'Backup and restore workflow',
      'Product guide and onboarding materials',
    ],
    paymentLink: import.meta.env.VITE_STRIPE_STARTER_PAYMENT_LINK,
  },
  {
    id: 'professional',
    name: 'Professional Setup',
    price: '$349.95',
    tagline: 'Recommended for real launch',
    cta: 'Buy Professional',
    summary: 'Adds onboarding and buyer-ready setup support so the customer can go live faster with less friction.',
    features: [
      'Everything in Starter',
      'Priority buyer portal access',
      'Cloud sync setup checklist',
      'Email onboarding handoff flow',
    ],
    paymentLink: import.meta.env.VITE_STRIPE_PROFESSIONAL_PAYMENT_LINK,
  },
  {
    id: 'studio',
    name: 'Studio Custom',
    price: '$749.95',
    tagline: 'For white-label or customization',
    cta: 'Request Studio',
    summary: 'For custom branding, implementation help, and higher-touch delivery.',
    features: [
      'Everything in Professional',
      'White-label customization path',
      'Implementation planning notes',
      'High-touch launch support placeholder',
    ],
    paymentLink: import.meta.env.VITE_STRIPE_STUDIO_PAYMENT_LINK,
  },
];

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function setPendingPlan(planId: MassageDeskPlanId) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(PENDING_PLAN_KEY, planId);
}

export function getPendingPlan(): MassageDeskPlanId | null {
  if (!canUseStorage()) return null;
  const value = window.localStorage.getItem(PENDING_PLAN_KEY);
  if (value === 'starter' || value === 'professional' || value === 'studio') {
    return value;
  }
  return null;
}

export function clearPendingPlan() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(PENDING_PLAN_KEY);
}

export function getPlanById(planId: MassageDeskPlanId | null) {
  return plans.find(plan => plan.id === planId) ?? null;
}

export function enableOwnerPreview(planId: MassageDeskPlanId = 'professional') {
  if (!canUseStorage()) return;
  window.localStorage.setItem(OWNER_PREVIEW_KEY, 'true');
  window.localStorage.setItem(OWNER_PREVIEW_PLAN_KEY, planId);
}

export function disableOwnerPreview() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(OWNER_PREVIEW_KEY);
  window.localStorage.removeItem(OWNER_PREVIEW_PLAN_KEY);
}

export function isOwnerPreviewEnabled() {
  if (!canUseStorage()) return false;
  return window.localStorage.getItem(OWNER_PREVIEW_KEY) === 'true';
}

export function getOwnerPreviewPlan(): MassageDeskPlanId {
  if (!canUseStorage()) return 'professional';
  const value = window.localStorage.getItem(OWNER_PREVIEW_PLAN_KEY);
  if (value === 'starter' || value === 'professional' || value === 'studio') {
    return value;
  }
  return 'professional';
}

export function activateOwnerPreviewFromUrl() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const ownerPreview = params.get('ownerPreview');
  const plan = params.get('plan');

  if (ownerPreview !== '1') return false;

  const previewPlan =
    plan === 'starter' || plan === 'professional' || plan === 'studio'
      ? plan
      : 'professional';

  enableOwnerPreview(previewPlan);
  return true;
}
