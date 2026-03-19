import { supabase } from './supabase';
import type { AdminSaleRecord, FulfillmentTask } from './massagedeskosAdmin';

interface SaleRow {
  id: string;
  stripe_customer_email: string;
  buyer_name: string | null;
  business_name: string | null;
  plan_id: 'starter' | 'professional' | 'studio';
  amount_total: number;
  currency: string;
  payment_link_url: string | null;
  fulfillment_status: AdminSaleRecord['stage'];
  owner_assignee: string;
  purchased_at: string;
  due_at: string | null;
  notes: string;
  payment_confirmed: boolean;
  portal_access_sent: boolean;
  intake_captured: boolean;
  updated_at: string;
}

interface TaskRow {
  id: string;
  sale_id: string;
  label: string;
  owner_hint: string;
  completed: boolean;
}

function amountLabel(amountTotal: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (currency || 'usd').toUpperCase(),
  }).format((amountTotal || 0) / 100);
}

function taskKey(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function mapRecord(row: SaleRow, tasks: TaskRow[]): AdminSaleRecord {
  const saleTasks = tasks
    .filter(task => task.sale_id === row.id)
    .map<FulfillmentTask>(task => ({
      id: task.id,
      label: task.label,
      ownerHint: task.owner_hint,
      completed: task.completed,
    }));

  return {
    id: row.id,
    buyerName: row.buyer_name || 'Buyer',
    buyerEmail: row.stripe_customer_email,
    businessName: row.business_name || '',
    planId: row.plan_id,
    amountLabel: amountLabel(row.amount_total, row.currency),
    stripePaymentLink: row.payment_link_url || '',
    stage: row.fulfillment_status,
    assignedOwner: row.owner_assignee,
    purchaseDate: row.purchased_at,
    dueDate: row.due_at || row.purchased_at,
    notes: row.notes,
    fulfillmentTasks: saleTasks,
    paymentConfirmed: row.payment_confirmed,
    portalAccessSent: row.portal_access_sent,
    intakeCaptured: row.intake_captured,
    lastUpdatedAt: row.updated_at,
  };
}

export async function fetchRemoteAdminSales() {
  const [{ data: sales, error: salesError }, { data: tasks, error: tasksError }] = await Promise.all([
    supabase
      .from('massagedeskos_sales')
      .select(
        'id, stripe_customer_email, buyer_name, business_name, plan_id, amount_total, currency, payment_link_url, fulfillment_status, owner_assignee, purchased_at, due_at, notes, payment_confirmed, portal_access_sent, intake_captured, updated_at',
      )
      .order('purchased_at', { ascending: false }),
    supabase
      .from('massagedeskos_sale_tasks')
      .select('id, sale_id, label, owner_hint, completed')
      .order('sort_order', { ascending: true }),
  ]);

  if (salesError) throw salesError;
  if (tasksError) throw tasksError;

  return (sales || []).map(row => mapRecord(row as SaleRow, (tasks || []) as TaskRow[]));
}

export async function upsertRemoteAdminSale(record: AdminSaleRecord) {
  const salePayload = {
    id: record.id,
    stripe_customer_email: record.buyerEmail.toLowerCase(),
    buyer_name: record.buyerName,
    business_name: record.businessName,
    plan_id: record.planId,
    amount_total: Math.round(Number(record.amountLabel.replace(/[^0-9.]/g, '')) * 100),
    currency: 'usd',
    payment_link_url: record.stripePaymentLink || null,
    fulfillment_status: record.stage,
    owner_assignee: record.assignedOwner,
    purchased_at: record.purchaseDate,
    due_at: record.dueDate || null,
    notes: record.notes,
    payment_confirmed: record.paymentConfirmed,
    portal_access_sent: record.portalAccessSent,
    intake_captured: record.intakeCaptured,
  };

  const { error: saleError } = await supabase.from('massagedeskos_sales').upsert(salePayload, { onConflict: 'id' });
  if (saleError) throw saleError;

  const { error: deleteError } = await supabase.from('massagedeskos_sale_tasks').delete().eq('sale_id', record.id);
  if (deleteError) throw deleteError;

  if (record.fulfillmentTasks.length > 0) {
    const { error: taskError } = await supabase.from('massagedeskos_sale_tasks').insert(
      record.fulfillmentTasks.map((task, index) => ({
        id: task.id,
        sale_id: record.id,
        task_key: taskKey(task.label),
        label: task.label,
        owner_hint: task.ownerHint,
        completed: task.completed,
        sort_order: index,
      })),
    );

    if (taskError) throw taskError;
  }
}

export async function deleteRemoteAdminSale(recordId: string) {
  const { error } = await supabase.from('massagedeskos_sales').delete().eq('id', recordId);
  if (error) throw error;
}
