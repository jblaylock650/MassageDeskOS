import { Link, useNavigate } from 'react-router-dom';
import {
  clearBuyerSession,
  disableOwnerPreview,
  enableOwnerPreview,
  getBuyerSession,
  getPlanById,
  isOwnerPreviewEnabled,
  productInfo,
} from '../../../lib/massagedeskosAccess';

const onboardingSteps = [
  'Open the hosted PWA in a supported browser.',
  'Choose "Install App" or "Add to Home Screen."',
  'Run a first backup after adding your first records.',
  'Enable Google Sheets sync only after testing your own Google setup.',
];

export default function MassageDeskBuyerPortalPage() {
  const navigate = useNavigate();
  const session = getBuyerSession();
  const currentPlan = getPlanById(session?.purchasedPlan ?? null);
  const ownerPreview = isOwnerPreviewEnabled();

  const handleSignOut = () => {
    clearBuyerSession();
    disableOwnerPreview();
    navigate('/products/massagedeskos/login');
  };

  const handleOwnerPlanSwitch = (planId: 'starter' | 'professional' | 'studio') => {
    enableOwnerPreview(planId);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f0e9_0%,#ffffff_55%,#f8f5ee_100%)] text-stone-900">
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">Buyer Portal</div>
            <div className="mt-1 text-2xl font-black text-stone-900">{productInfo.name}</div>
          </div>
          <div className="flex items-center gap-3">
            {ownerPreview && (
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                Owner Preview
              </span>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
            >
              Exit Portal
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {ownerPreview && (
          <section className="mb-8 rounded-[1.75rem] border border-emerald-200 bg-emerald-50 px-6 py-5 text-sm leading-7 text-emerald-900">
            <span className="font-semibold">Owner preview is active.</span> Use the plan switcher below to test how the portal
            feels across each offer tier without any paywall or real payment link.
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] bg-stone-950 p-8 text-white">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5d58c]">Post-purchase experience</div>
            <h1 className="mt-4 font-serif text-5xl leading-tight">Your buyer now has a clean place to install, learn, and start.</h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75">
              This is where the real business value lives after checkout. Instead of dropping buyers onto a raw download page,
              you give them a focused portal with install access, onboarding steps, support information, and future update visibility.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={productInfo.installUrl}
                className="rounded-full bg-[#f5d58c] px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-[#edc765]"
              >
                Open Hosted App
              </a>
              <a
                href={productInfo.installUrl}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                Install App
              </a>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">Buyer record</div>
            <div className="mt-5 space-y-5 text-sm text-stone-700">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-stone-400">Name</div>
                <div className="mt-1 text-lg font-semibold text-stone-900">{session?.name || 'Buyer name'}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-stone-400">Email</div>
                <div className="mt-1 text-lg font-semibold text-stone-900">{session?.email || 'buyer@example.com'}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-stone-400">Plan</div>
                <div className="mt-1 text-lg font-semibold text-stone-900">{currentPlan?.name || 'No plan'}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-stone-400">Purchased</div>
                <div className="mt-1 text-lg font-semibold text-stone-900">
                  {session?.purchasedAt ? new Date(session.purchasedAt).toLocaleString() : 'Not set'}
                </div>
              </div>
            </div>

            {ownerPreview && (
              <div className="mt-8 rounded-[1.5rem] bg-stone-50 p-5">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Owner plan switcher</div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {(['starter', 'professional', 'studio'] as const).map((planId) => (
                    <button
                      key={planId}
                      type="button"
                      onClick={() => handleOwnerPlanSwitch(planId)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        session?.purchasedPlan === planId
                          ? 'bg-stone-900 text-white'
                          : 'border border-stone-300 text-stone-700 hover:border-stone-500'
                      }`}
                    >
                      Preview {planId}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-8">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">Quick start</div>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">Install and launch checklist</h2>
            <div className="mt-6 space-y-4">
              {onboardingSteps.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-2xl bg-stone-50 px-4 py-4">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#7f8a62] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-7 text-stone-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-stone-200 bg-[#f7f8f1] p-8">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">Included resources</div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <a href={productInfo.installUrl} className="rounded-2xl bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5">
                  <div className="text-sm font-semibold text-stone-900">Hosted PWA</div>
                  <div className="mt-2 text-sm text-stone-600">Open the installable version of the app.</div>
                </a>
                <Link to="/products/massagedeskos" className="rounded-2xl bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5">
                  <div className="text-sm font-semibold text-stone-900">Product Overview</div>
                  <div className="mt-2 text-sm text-stone-600">Review the positioning and product value story.</div>
                </Link>
                <Link to="/products/massagedeskos/pricing" className="rounded-2xl bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5">
                  <div className="text-sm font-semibold text-stone-900">Plan Reference</div>
                  <div className="mt-2 text-sm text-stone-600">See what license tier the buyer selected.</div>
                </Link>
                <a href={`mailto:${productInfo.supportEmail}`} className="rounded-2xl bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5">
                  <div className="text-sm font-semibold text-stone-900">Support Contact</div>
                  <div className="mt-2 text-sm text-stone-600">{productInfo.supportEmail}</div>
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-8">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">Production note</div>
              <h2 className="mt-3 text-2xl font-bold text-stone-900">What this becomes later</h2>
              <p className="mt-4 text-sm leading-7 text-stone-700">
                In the real paid version, this page should be powered by a server-side entitlement check. The buyer signs in,
                the portal verifies their purchase, and then the install link, downloads, and update notes are shown based on
                their active license. For now, the owner preview and local stub let us test the full post-purchase experience.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
