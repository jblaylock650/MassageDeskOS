import type { MassageDeskPlanId } from './massagedeskosAccess';

export type AdminSaleStage =
  | 'payment_received'
  | 'buyer_contacted'
  | 'portal_ready'
  | 'setup_scheduled'
  | 'fulfillment_in_progress'
  | 'delivered'
  | 'closed';

export interface FulfillmentTask {
  id: string;
  label: string;
  ownerHint: string;
  completed: boolean;
}

export interface AdminSaleRecord {
  id: string;
  buyerName: string;
  buyerEmail: string;
  businessName: string;
  planId: MassageDeskPlanId;
  amountLabel: string;
  stripePaymentLink: string;
  stage: AdminSaleStage;
  assignedOwner: string;
  purchaseDate: string;
  dueDate: string;
  notes: string;
  fulfillmentTasks: FulfillmentTask[];
  paymentConfirmed: boolean;
  portalAccessSent: boolean;
  intakeCaptured: boolean;
  lastUpdatedAt: string;
}

export interface FulfillmentTemplate {
  planId: MassageDeskPlanId;
  heading: string;
  promise: string;
  targetWindow: string;
  tasks: Array<{ label: string; ownerHint: string }>;
}

const ADMIN_SALES_STORAGE_KEY = 'massagedeskosAdminSales';

export const ownerEmails = [
  'jblaylock650@gmail.com',
  'juxtaposedtidesmedia@gmail.com',
] as const;

export const saleStages: Array<{ id: AdminSaleStage; label: string }> = [
  { id: 'payment_received', label: 'Payment Received' },
  { id: 'buyer_contacted', label: 'Buyer Contacted' },
  { id: 'portal_ready', label: 'Portal Ready' },
  { id: 'setup_scheduled', label: 'Setup Scheduled' },
  { id: 'fulfillment_in_progress', label: 'Fulfillment In Progress' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'closed', label: 'Closed' },
];

export const fulfillmentTemplates: FulfillmentTemplate[] = [
  {
    planId: 'starter',
    heading: 'Starter License Fulfillment',
    promise: 'Fast digital delivery with clear buyer access and self-serve onboarding.',
    targetWindow: 'Same day or within 24 hours of confirmed payment.',
    tasks: [
      { label: 'Confirm payment in Stripe dashboard', ownerHint: 'Owner' },
      { label: 'Create buyer portal record and verify plan tier', ownerHint: 'Owner' },
      { label: 'Send buyer access email with portal link and quick-start guide', ownerHint: 'Owner' },
      { label: 'Confirm buyer can open hosted PWA and install it', ownerHint: 'Owner' },
      { label: 'Mark delivery complete and archive notes', ownerHint: 'Owner' },
    ],
  },
  {
    planId: 'professional',
    heading: 'Professional Setup Fulfillment',
    promise: 'Guided onboarding plus assisted setup so the buyer launches confidently.',
    targetWindow: 'Initial outreach same day, onboarding scheduled within 2 business days.',
    tasks: [
      { label: 'Confirm payment in Stripe dashboard', ownerHint: 'Owner' },
      { label: 'Send welcome email with scheduling link and portal access', ownerHint: 'Owner' },
      { label: 'Collect buyer setup details, preferred browser/device, and Google sync intent', ownerHint: 'Owner' },
      { label: 'Schedule onboarding or setup session', ownerHint: 'Owner' },
      { label: 'Walk buyer through install, backups, and first records', ownerHint: 'Owner' },
      { label: 'Document setup completion and next support actions', ownerHint: 'Owner' },
    ],
  },
  {
    planId: 'studio',
    heading: 'Studio Custom Fulfillment',
    promise: 'High-touch customization, implementation planning, and bespoke launch support.',
    targetWindow: 'Personal outreach same day, scope alignment within 2 business days.',
    tasks: [
      { label: 'Confirm payment and verify custom scope expectations', ownerHint: 'Owner' },
      { label: 'Send premium welcome email and request branding/customization assets', ownerHint: 'Owner' },
      { label: 'Run discovery call covering workflow changes, branding, and delivery plan', ownerHint: 'Owner' },
      { label: 'Create internal implementation notes and milestone dates', ownerHint: 'Owner' },
      { label: 'Deliver custom build and walkthrough', ownerHint: 'Owner' },
      { label: 'Collect launch approval and close out final support items', ownerHint: 'Owner' },
    ],
  },
];

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function createTaskId(label: string) {
  const base = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${base}-${Math.random().toString(36).slice(2, 8)}`;
}

export function isOwnerEmail(email?: string | null) {
  if (!email) return false;
  return ownerEmails.includes(email.trim().toLowerCase() as (typeof ownerEmails)[number]);
}

export function getFulfillmentTemplate(planId: MassageDeskPlanId) {
  return fulfillmentTemplates.find(template => template.planId === planId) ?? fulfillmentTemplates[0];
}

export function createFulfillmentTasks(planId: MassageDeskPlanId): FulfillmentTask[] {
  return getFulfillmentTemplate(planId).tasks.map(task => ({
    id: createTaskId(task.label),
    label: task.label,
    ownerHint: task.ownerHint,
    completed: false,
  }));
}

export function getAdminSales(): AdminSaleRecord[] {
  if (!canUseStorage()) return [];
  const raw = window.localStorage.getItem(ADMIN_SALES_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as AdminSaleRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAdminSales(records: AdminSaleRecord[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(ADMIN_SALES_STORAGE_KEY, JSON.stringify(records));
}

export function upsertAdminSale(record: AdminSaleRecord) {
  const current = getAdminSales();
  const next = current.some(item => item.id === record.id)
    ? current.map(item => (item.id === record.id ? record : item))
    : [record, ...current];

  saveAdminSales(next);
}

export function deleteAdminSale(recordId: string) {
  const next = getAdminSales().filter(record => record.id !== recordId);
  saveAdminSales(next);
}

export function createAdminSaleRecord(input: {
  buyerName: string;
  buyerEmail: string;
  businessName?: string;
  planId: MassageDeskPlanId;
  amountLabel: string;
  stripePaymentLink: string;
  assignedOwner: string;
  purchaseDate?: string;
  dueDate?: string;
  notes?: string;
}): AdminSaleRecord {
  const purchaseDate = input.purchaseDate || new Date().toISOString();
  const dueDate = input.dueDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();

  return {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `sale-${Date.now()}`,
    buyerName: input.buyerName.trim(),
    buyerEmail: input.buyerEmail.trim().toLowerCase(),
    businessName: input.businessName?.trim() || '',
    planId: input.planId,
    amountLabel: input.amountLabel,
    stripePaymentLink: input.stripePaymentLink,
    stage: 'payment_received',
    assignedOwner: input.assignedOwner,
    purchaseDate,
    dueDate,
    notes: input.notes?.trim() || '',
    fulfillmentTasks: createFulfillmentTasks(input.planId),
    paymentConfirmed: true,
    portalAccessSent: false,
    intakeCaptured: true,
    lastUpdatedAt: new Date().toISOString(),
  };
}

export function toggleTaskCompletion(record: AdminSaleRecord, taskId: string) {
  return {
    ...record,
    fulfillmentTasks: record.fulfillmentTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    ),
    lastUpdatedAt: new Date().toISOString(),
  };
}

export function updateSaleStage(record: AdminSaleRecord, stage: AdminSaleStage) {
  return {
    ...record,
    stage,
    lastUpdatedAt: new Date().toISOString(),
  };
}
