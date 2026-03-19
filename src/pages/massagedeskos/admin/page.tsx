import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { plans } from '../../../lib/massagedeskosAccess';
import {
  AdminSaleRecord,
  createAdminSaleRecord,
  deleteAdminSale,
  fulfillmentTemplates,
  getAdminSales,
  getFulfillmentTemplate,
  ownerEmails,
  saleStages,
  saveAdminSales,
  toggleTaskCompletion,
  updateSaleStage,
  upsertAdminSale,
} from '../../../lib/massagedeskosAdmin';
import { deleteRemoteAdminSale, fetchRemoteAdminSales, upsertRemoteAdminSale } from '../../../lib/massagedeskosSalesApi';

const planAmounts: Record<'starter' | 'professional' | 'studio', string> = {
  starter: '$149.95',
  professional: '$349.95',
  studio: '$749.95',
};

const paymentLinks: Record<'starter' | 'professional' | 'studio', string> = {
  starter: 'https://buy.stripe.com/5kQ3cw4Oe1bt1nGcFNaZi00',
  professional: 'https://buy.stripe.com/00w28s3Ka07p6I0bBJaZi01',
  studio: 'https://buy.stripe.com/4gMaEY3Ka1bteas8pxaZi02',
};

type PlanId = 'starter' | 'professional' | 'studio';

export default function MassageDeskAdminPage() {
  const { user, signOut } = useAuth();
  const [sales, setSales] = useState<AdminSaleRecord[]>([]);
  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [syncNotice, setSyncNotice] = useState('Checking shared admin database...');
  const [remoteReady, setRemoteReady] = useState(false);
  const [newSale, setNewSale] = useState({
    buyerName: '',
    buyerEmail: '',
    businessName: '',
    planId: 'starter' as PlanId,
    assignedOwner: ownerEmails[0],
    purchaseDate: new Date().toISOString().slice(0, 10),
    dueDate: '',
    notes: '',
  });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const remoteSales = await fetchRemoteAdminSales();
        if (cancelled) return;

        setRemoteReady(true);
        setSyncNotice('Phase 2 backend is connected. Sales are loading from Supabase.');
        setSales(remoteSales);
        if (remoteSales[0]) {
          setSelectedSaleId(remoteSales[0].id);
        }
      } catch {
        if (cancelled) return;

        const stored = getAdminSales();
        setRemoteReady(false);
        setSyncNotice('Shared backend tables are not live yet. Dashboard is using local browser storage fallback for now.');
        setSales(stored);
        if (stored[0]) {
          setSelectedSaleId(stored[0].id);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const sortedSales = useMemo(
    () =>
      [...sales].sort((left, right) => new Date(right.purchaseDate).getTime() - new Date(left.purchaseDate).getTime()),
    [sales],
  );

  const selectedSale = useMemo(
    () => sortedSales.find(record => record.id === selectedSaleId) ?? sortedSales[0] ?? null,
    [selectedSaleId, sortedSales],
  );

  const stats = useMemo(() => {
    const starter = sales.filter(record => record.planId === 'starter').length;
    const professional = sales.filter(record => record.planId === 'professional').length;
    const studio = sales.filter(record => record.planId === 'studio').length;
    const activeFulfillment = sales.filter(record => !['delivered', 'closed'].includes(record.stage)).length;

    return { starter, professional, studio, activeFulfillment, total: sales.length };
  }, [sales]);

  const handleCreateSale = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    try {
      if (!newSale.buyerName.trim() || !newSale.buyerEmail.trim()) {
        throw new Error('Buyer name and buyer email are required.');
      }

      const record = createAdminSaleRecord({
        buyerName: newSale.buyerName,
        buyerEmail: newSale.buyerEmail,
        businessName: newSale.businessName,
        planId: newSale.planId,
        amountLabel: planAmounts[newSale.planId],
        stripePaymentLink: paymentLinks[newSale.planId],
        assignedOwner: newSale.assignedOwner,
        purchaseDate: new Date(`${newSale.purchaseDate}T12:00:00`).toISOString(),
        dueDate: newSale.dueDate ? new Date(`${newSale.dueDate}T12:00:00`).toISOString() : undefined,
        notes: newSale.notes,
      });

      const next = [record, ...sales];
      setSales(next);
      if (remoteReady) {
        void upsertRemoteAdminSale(record);
      } else {
        saveAdminSales(next);
      }
      setSelectedSaleId(record.id);
      setNewSale({
        buyerName: '',
        buyerEmail: '',
        businessName: '',
        planId: 'starter',
        assignedOwner: ownerEmails[0],
        purchaseDate: new Date().toISOString().slice(0, 10),
        dueDate: '',
        notes: '',
      });
    } catch (caughtError) {
      setFormError(caughtError instanceof Error ? caughtError.message : 'Unable to create the sale record.');
    }
  };

  const handleStageChange = (record: AdminSaleRecord, nextStage: AdminSaleRecord['stage']) => {
    const updated = updateSaleStage(record, nextStage);
    const next = sales.map(item => (item.id === record.id ? updated : item));
    setSales(next);
    if (remoteReady) {
      void upsertRemoteAdminSale(updated);
    } else {
      upsertAdminSale(updated);
    }
  };

  const handleTaskToggle = (record: AdminSaleRecord, taskId: string) => {
    const updated = toggleTaskCompletion(record, taskId);
    const next = sales.map(item => (item.id === record.id ? updated : item));
    setSales(next);
    if (remoteReady) {
      void upsertRemoteAdminSale(updated);
    } else {
      upsertAdminSale(updated);
    }
  };

  const handleFlagToggle = (record: AdminSaleRecord, field: 'paymentConfirmed' | 'portalAccessSent' | 'intakeCaptured') => {
    const updated = {
      ...record,
      [field]: !record[field],
      lastUpdatedAt: new Date().toISOString(),
    };
    const next = sales.map(item => (item.id === record.id ? updated : item));
    setSales(next);
    if (remoteReady) {
      void upsertRemoteAdminSale(updated);
    } else {
      upsertAdminSale(updated);
    }
  };

  const handleDeleteSale = (recordId: string) => {
    const next = sales.filter(record => record.id !== recordId);
    setSales(next);
    if (remoteReady) {
      void deleteRemoteAdminSale(recordId);
    } else {
      deleteAdminSale(recordId);
    }
    if (selectedSaleId === recordId) {
      setSelectedSaleId(next[0]?.id ?? null);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f1e8_0%,#ffffff_38%,#f7f3eb_100%)] text-stone-900">
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-stone-500">MassageDeskOS Internal Ops</div>
            <div className="mt-1 text-2xl font-black text-stone-900">Owner Sales + Fulfillment Dashboard</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
              {user?.email}
            </span>
            <Link
              to="/products/massagedeskos"
              className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
            >
              Public Site
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Total Sales</div>
            <div className="mt-3 text-4xl font-black text-stone-900">{stats.total}</div>
          </div>
          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Starter</div>
            <div className="mt-3 text-4xl font-black text-stone-900">{stats.starter}</div>
          </div>
          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Professional</div>
            <div className="mt-3 text-4xl font-black text-stone-900">{stats.professional}</div>
          </div>
          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Studio</div>
            <div className="mt-3 text-4xl font-black text-stone-900">{stats.studio}</div>
          </div>
          <div className="rounded-[1.75rem] border border-[#d9d0bc] bg-[#fff6dd] p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Open Fulfillment</div>
            <div className="mt-3 text-4xl font-black text-stone-900">{stats.activeFulfillment}</div>
          </div>
        </section>

        <section className={`mt-6 rounded-[1.5rem] border px-5 py-4 text-sm leading-7 ${
          remoteReady ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-900'
        }`}>
          <span className="font-semibold">Phase 2 status:</span> {syncNotice}
        </section>

        <section className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-8">
            <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">Manual Sales Intake</div>
                  <h2 className="mt-3 font-serif text-3xl text-stone-900">Capture each paid buyer into the ops pipeline</h2>
                  <p className="mt-4 text-sm leading-7 text-stone-700">
                    Because the current launch is on static Surge + Stripe Payment Links, this panel does not ingest Stripe sales
                    automatically yet. Use this intake form right after you confirm a payment in Stripe.
                  </p>
                </div>
              </div>

              {formError && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {formError}
                </div>
              )}

              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleCreateSale}>
                <input
                  value={newSale.buyerName}
                  onChange={event => setNewSale(current => ({ ...current, buyerName: event.target.value }))}
                  placeholder="Buyer name"
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <input
                  value={newSale.buyerEmail}
                  onChange={event => setNewSale(current => ({ ...current, buyerEmail: event.target.value }))}
                  placeholder="Buyer email"
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <input
                  value={newSale.businessName}
                  onChange={event => setNewSale(current => ({ ...current, businessName: event.target.value }))}
                  placeholder="Business or practice name"
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <select
                  value={newSale.planId}
                  onChange={event => setNewSale(current => ({ ...current, planId: event.target.value as PlanId }))}
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                >
                  {plans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} {plan.price}
                    </option>
                  ))}
                </select>
                <select
                  value={newSale.assignedOwner}
                  onChange={event => setNewSale(current => ({ ...current, assignedOwner: event.target.value }))}
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                >
                  {ownerEmails.map(ownerEmail => (
                    <option key={ownerEmail} value={ownerEmail}>
                      {ownerEmail}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newSale.purchaseDate}
                  onChange={event => setNewSale(current => ({ ...current, purchaseDate: event.target.value }))}
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <input
                  type="date"
                  value={newSale.dueDate}
                  onChange={event => setNewSale(current => ({ ...current, dueDate: event.target.value }))}
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <textarea
                  value={newSale.notes}
                  onChange={event => setNewSale(current => ({ ...current, notes: event.target.value }))}
                  placeholder="Purchase notes, buyer requests, scope reminders, or Stripe notes"
                  className="min-h-[140px] rounded-[1.5rem] border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15 md:col-span-2"
                />
                <button
                  type="submit"
                  className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 md:col-span-2"
                >
                  Add Sale To Fulfillment Board
                </button>
              </form>
            </section>

            <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">In-House Fulfillment SOP</div>
              <div className="mt-5 grid gap-4">
                {fulfillmentTemplates.map(template => (
                  <article key={template.planId} className="rounded-[1.5rem] bg-stone-50 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-stone-900">{template.heading}</h3>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                        {template.targetWindow}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-stone-700">{template.promise}</p>
                    <div className="mt-4 space-y-2">
                      {template.tasks.map(task => (
                        <div key={task.label} className="flex gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-stone-700">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#7f8a62]"></span>
                          <span>{task.label}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">Sales Board</div>
                  <h2 className="mt-3 font-serif text-3xl text-stone-900">Every sale, owner, and next action in one place</h2>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {sortedSales.length === 0 && (
                  <div className="rounded-[1.5rem] bg-stone-50 px-5 py-6 text-sm leading-7 text-stone-700">
                    No sales have been entered yet. Confirm the first Stripe payment and add it above to start the fulfillment pipeline.
                  </div>
                )}

                {sortedSales.map(record => (
                  <button
                    key={record.id}
                    type="button"
                    onClick={() => setSelectedSaleId(record.id)}
                    className={`w-full rounded-[1.5rem] border px-5 py-4 text-left transition ${
                      selectedSale?.id === record.id
                        ? 'border-[#7f8a62] bg-[#f7f8f1]'
                        : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-lg font-bold text-stone-900">{record.buyerName}</div>
                        <div className="text-sm text-stone-600">{record.buyerEmail}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-stone-900">{record.amountLabel}</div>
                        <div className="text-xs uppercase tracking-[0.18em] text-stone-500">
                          {plans.find(plan => plan.id === record.planId)?.name}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                      <span>{saleStages.find(stage => stage.id === record.stage)?.label}</span>
                      <span>Owner: {record.assignedOwner}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {selectedSale && (
              <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">Selected Sale</div>
                    <h2 className="mt-3 font-serif text-3xl text-stone-900">{selectedSale.buyerName}</h2>
                    <p className="mt-2 text-sm leading-7 text-stone-700">
                      {selectedSale.buyerEmail}
                      {selectedSale.businessName ? ` • ${selectedSale.businessName}` : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteSale(selectedSale.id)}
                    className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-400"
                  >
                    Delete Sale
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-stone-50 p-5">
                    <div className="text-xs uppercase tracking-[0.18em] text-stone-500">Plan</div>
                    <div className="mt-2 text-lg font-bold text-stone-900">
                      {plans.find(plan => plan.id === selectedSale.planId)?.name}
                    </div>
                    <div className="mt-1 text-sm text-stone-600">{selectedSale.amountLabel}</div>
                  </div>
                  <div className="rounded-[1.5rem] bg-stone-50 p-5">
                    <div className="text-xs uppercase tracking-[0.18em] text-stone-500">Assigned Owner</div>
                    <div className="mt-2 text-lg font-bold text-stone-900">{selectedSale.assignedOwner}</div>
                    <div className="mt-1 text-sm text-stone-600">
                      Due {new Date(selectedSale.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Current Stage</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {saleStages.map(stage => (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => handleStageChange(selectedSale, stage.id)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          selectedSale.stage === stage.id
                            ? 'bg-stone-900 text-white'
                            : 'border border-stone-300 text-stone-700 hover:border-stone-500'
                        }`}
                      >
                        {stage.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    ['paymentConfirmed', 'Payment confirmed in Stripe'],
                    ['portalAccessSent', 'Buyer portal access sent'],
                    ['intakeCaptured', 'Ops intake captured'],
                  ].map(([field, label]) => (
                    <button
                      key={field}
                      type="button"
                      onClick={() =>
                        handleFlagToggle(
                          selectedSale,
                          field as 'paymentConfirmed' | 'portalAccessSent' | 'intakeCaptured',
                        )
                      }
                      className={`rounded-[1.25rem] border px-4 py-4 text-left text-sm font-semibold transition ${
                        selectedSale[field as 'paymentConfirmed' | 'portalAccessSent' | 'intakeCaptured']
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-stone-200 bg-stone-50 text-stone-700'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.5rem] bg-[#f7f8f1] p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Fulfillment Checklist</div>
                  <div className="mt-4 space-y-3">
                    {selectedSale.fulfillmentTasks.map(task => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => handleTaskToggle(selectedSale, task.id)}
                        className={`flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                          task.completed ? 'bg-emerald-100 text-emerald-900' : 'bg-white text-stone-700'
                        }`}
                      >
                        <span
                          className={`mt-0.5 h-5 w-5 rounded-full border ${
                            task.completed ? 'border-emerald-700 bg-emerald-700' : 'border-stone-300 bg-white'
                          }`}
                        ></span>
                        <span>{task.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-[1.5rem] bg-stone-50 p-5 text-sm leading-7 text-stone-700">
                  <div className="font-semibold text-stone-900">Plan playbook</div>
                  <p className="mt-2">{getFulfillmentTemplate(selectedSale.planId).promise}</p>
                  <p className="mt-2">
                    <span className="font-semibold text-stone-900">Target window:</span>{' '}
                    {getFulfillmentTemplate(selectedSale.planId).targetWindow}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-stone-900">Stripe payment link used:</span>{' '}
                    <a className="text-[#875d5d] underline" href={selectedSale.stripePaymentLink} target="_blank" rel="noreferrer">
                      Open link
                    </a>
                  </p>
                  {selectedSale.notes && (
                    <p className="mt-2">
                      <span className="font-semibold text-stone-900">Notes:</span> {selectedSale.notes}
                    </p>
                  )}
                </div>
              </section>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
