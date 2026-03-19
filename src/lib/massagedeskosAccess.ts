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

export interface BuyerSession {
  email: string;
  name: string;
  company?: string;
  purchasedPlan: MassageDeskPlanId | null;
  purchasedAt: string | null;
}

const BUYER_STORAGE_KEY = 'massagedeskosBuyerSession';
const PENDING_PLAN_KEY = 'massagedeskosPendingPlan';
const OWNER_PREVIEW_KEY = 'massagedeskosOwnerPreview';

export const productInfo = {
  name: 'MassageDeskOS v8 Public Version 1',
  shortName: 'MassageDeskOS Pro',
  installUrl: '/massagedeskos/',
  demoUrl: '/massagedeskos/?demo=1',
  supportEmail: import.meta.env.VITE_MASSAGEDESKOS_SUPPORT_EMAIL || 'support@massagedeskos.app',
};

export const plans: MassageDeskPlan[] = [
  {
    id: 'starter',
    name: 'Starter License',
    price: '$149',
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
    price: '$349',
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
    price: '$749',
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

export function getBuyerSession(): BuyerSession | null {
  if (!canUseStorage()) return null;
  const raw = window.localStorage.getItem(BUYER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as BuyerSession;
  } catch {
    return null;
  }
}

export function saveBuyerSession(session: BuyerSession) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(BUYER_STORAGE_KEY, JSON.stringify(session));
}

export function clearBuyerSession() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(BUYER_STORAGE_KEY);
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

export function completeStubPurchase(name: string, email: string, password: string, company?: string) {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const pendingPlan = getPendingPlan();

  if (!trimmedName || !trimmedEmail || !password.trim()) {
    throw new Error('Name, email, and password are required.');
  }

  if (!pendingPlan) {
    throw new Error('No pending purchase found. Choose a plan first.');
  }

  const session: BuyerSession = {
    email: trimmedEmail,
    name: trimmedName,
    company: company?.trim() || '',
    purchasedPlan: pendingPlan,
    purchasedAt: new Date().toISOString(),
  };

  saveBuyerSession(session);
  clearPendingPlan();
  return session;
}

export function signInStub(email: string, password: string) {
  const session = getBuyerSession();
  if (!session) {
    throw new Error('No buyer account found yet. Complete checkout or create your buyer access first.');
  }

  if (!email.trim() || !password.trim()) {
    throw new Error('Email and password are required.');
  }

  if (session.email !== email.trim().toLowerCase()) {
    throw new Error('This email does not match the current buyer access stub.');
  }

  return session;
}

export function hasBuyerAccess() {
  if (isOwnerPreviewEnabled()) return true;
  const session = getBuyerSession();
  return Boolean(session?.purchasedPlan);
}

export function getPlanById(planId: MassageDeskPlanId | null) {
  return plans.find(plan => plan.id === planId) ?? null;
}

export function enableOwnerPreview(planId: MassageDeskPlanId = 'professional') {
  if (!canUseStorage()) return;
  window.localStorage.setItem(OWNER_PREVIEW_KEY, 'true');
  saveBuyerSession({
    email: 'owner-preview@massagedeskos.local',
    name: 'MassageDeskOS Owner Preview',
    company: 'Internal QA',
    purchasedPlan: planId,
    purchasedAt: new Date().toISOString(),
  });
}

export function disableOwnerPreview() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(OWNER_PREVIEW_KEY);
}

export function isOwnerPreviewEnabled() {
  if (!canUseStorage()) return false;
  return window.localStorage.getItem(OWNER_PREVIEW_KEY) === 'true';
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
