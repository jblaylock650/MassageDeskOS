import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { plans, setPendingPlan } from '../../../lib/massagedeskosAccess';

const tierGuidance = {
  starter: {
    bestFor: 'Best for therapists who want the full app and feel comfortable getting started on their own.',
    explanation:
      'Starter gives you the complete MassageDeskOS core experience in its simplest, lowest-friction form. You get the installable app, the self-serve setup path, and the guidance you need to start organizing clients, appointments, visits, and backups without paying for extra hand-holding you may not need.',
    differences: [
      'Includes the full core MassageDeskOS app experience',
      'Best when you want a clean self-serve launch',
      'Ideal if you are comfortable following setup and backup guidance independently',
    ],
    recommendation: 'Choose Starter if you want the software itself and a straightforward path into using it at your own pace.',
  },
  professional: {
    bestFor: 'Best for therapists who want the app plus a smoother, more supported path into real daily use.',
    explanation:
      'Professional includes everything in Starter, but adds a more guided onboarding experience around it. This tier is designed for buyers who want to start using MassageDeskOS confidently and would rather have setup structure, onboarding direction, and a clearer launch path instead of figuring out every step alone.',
    differences: [
      'Includes everything in Starter',
      'Adds guided setup momentum and onboarding support',
      'A stronger fit if you want help turning the app into a working part of your practice quickly',
    ],
    recommendation: 'Choose Professional if you want the best balance of software access, clarity, and launch support.',
  },
  studio: {
    bestFor: 'Best for practices that want a more tailored rollout, branded presentation, or higher-touch implementation support.',
    explanation:
      'Studio includes everything in Professional and is the premium path for buyers who want more than standard setup. It is built for those who want a more customized launch experience, more implementation planning, and a more hands-on relationship around how MassageDeskOS is introduced into their business.',
    differences: [
      'Includes everything in Professional',
      'Adds a white-label or customization path',
      'Designed for buyers who want a more tailored implementation experience',
    ],
    recommendation: 'Choose Studio if you want MassageDeskOS as a more customized, premium rollout rather than a standard self-serve purchase.',
  },
} as const;

export default function MassageDeskPricingPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [notice, setNotice] = useState('');

  const handleStubCheckout = (planId: 'starter' | 'professional' | 'studio') => {
    setSelectedPlan(planId);
    setPendingPlan(planId);
    navigate('/products/massagedeskos/login', {
      state: { checkoutPlan: planId },
    });
  };

  const handlePlanClick = (planId: 'starter' | 'professional' | 'studio', paymentLink?: string) => {
    setSelectedPlan(planId);
    setPendingPlan(planId);
    setNotice('');

    if (paymentLink) {
      window.location.href = paymentLink;
      return;
    }

    setNotice('Secure checkout is being finalized. For now, this route continues into the customer-access preview flow.');
    handleStubCheckout(planId);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8ee_0%,#f7f4ed_42%,#ffffff_100%)] text-stone-900">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/products/massagedeskos" className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">
          MassageDeskOS
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/products/massagedeskos" className="text-sm font-semibold text-stone-600 hover:text-stone-900">
            Back to Overview
          </Link>
          <Link
            to="/products/massagedeskos/login"
            className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700"
          >
            Customer Login
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-16">
        <section className="rounded-[2.5rem] bg-stone-950 px-8 py-12 text-white lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5d58c]">Choose Your License</div>
              <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight lg:text-6xl">
                Pick the plan that fits how you want to launch your practice workflow.
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75">
                Start with a simple one-time license or choose a higher-touch setup package if you want more onboarding and
                implementation support.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">Best starting point</div>
              <h2 className="mt-3 text-2xl font-bold">Professional Setup</h2>
              <p className="mt-4 text-sm leading-7 text-white/75">
                This is the best fit for therapists who want the app plus a smoother onboarding path into real use.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-7">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-stone-50 px-4 py-4 text-sm leading-7 text-stone-700">
              <span className="font-semibold text-stone-900">One-time purchase:</span> pick your plan once and use your
              purchased version long-term.
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-4 text-sm leading-7 text-stone-700">
              <span className="font-semibold text-stone-900">No subscription fatigue:</span> no forced monthly app fee to
              keep your workflow active.
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-4 text-sm leading-7 text-stone-700">
              <span className="font-semibold text-stone-900">Private by intent:</span> your records are yours, not sold as
              ad-targeting inventory.
            </div>
            <div className="rounded-2xl bg-stone-50 px-4 py-4 text-sm leading-7 text-stone-700">
              <span className="font-semibold text-stone-900">No ad clutter:</span> no pushy in-app ad feed competing for your
              attention.
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const isFeatured = plan.id === 'professional';
            return (
              <article
                key={plan.id}
                className={`rounded-[2rem] border p-8 shadow-sm transition ${
                  isFeatured
                    ? 'border-[#7f8a62] bg-[#f7f8f1] shadow-[#7f8a62]/10'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">{plan.tagline}</div>
                  {isFeatured && (
                    <span className="rounded-full bg-[#7f8a62] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                      Recommended
                    </span>
                  )}
                </div>
                <h2 className="mt-4 text-3xl font-black text-stone-900">{plan.name}</h2>
                <div className="mt-3 text-5xl font-black text-[#875d5d]">{plan.price}</div>
                <p className="mt-4 min-h-[112px] text-sm leading-7 text-stone-600">{plan.summary}</p>
                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#7f8a62]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handlePlanClick(plan.id, plan.paymentLink)}
                  className={`mt-8 w-full rounded-full px-5 py-3 text-sm font-semibold transition ${
                    isFeatured
                      ? 'bg-stone-900 text-white hover:bg-stone-700'
                      : 'border border-stone-300 text-stone-900 hover:border-stone-500'
                  }`}
                >
                  {selectedPlan === plan.id
                    ? plan.paymentLink
                      ? 'Redirecting to Checkout...'
                      : 'Continuing...'
                    : plan.cta}
                </button>
              </article>
            );
          })}
        </section>

        {notice && (
          <section className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-7 text-amber-800">
            <span className="font-semibold">Checkout notice:</span> {notice}
          </section>
        )}

        <section className="mt-12 rounded-[2rem] border border-stone-200 bg-white p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">What happens next</div>
              <h2 className="mt-3 font-serif text-3xl text-stone-900">After purchase, you move into the customer access flow.</h2>
              <p className="mt-4 text-sm leading-7 text-stone-700">
                From there, you can open the hosted app, review onboarding guidance, and access your customer portal.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-stone-50 p-6">
              <div className="space-y-4 text-sm leading-7 text-stone-700">
                <p><span className="font-semibold text-stone-900">Hosted access:</span> installable browser app experience.</p>
                <p><span className="font-semibold text-stone-900">Customer portal:</span> onboarding, install entry, and account access.</p>
                <p><span className="font-semibold text-stone-900">Best fit:</span> solo therapists, mobile therapists, and independent wellness practices.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-stone-200 bg-[#fcfaf5] p-8">
          <div className="max-w-4xl">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">Compare The Tiers</div>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">What changes from one plan to the next</h2>
            <p className="mt-4 text-sm leading-7 text-stone-700">
              Every paid plan includes the core MassageDeskOS app. The difference is how much guided support, launch help,
              and customization you want around that core experience. If you want the most independent path, Starter is the
              cleanest fit. If you want a smoother launch with more guidance, Professional is the strongest value. If you want
              a more tailored rollout, Studio is the premium option.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => {
              const guidance = tierGuidance[plan.id];
              const isFeatured = plan.id === 'professional';

              return (
                <article
                  key={`guidance-${plan.id}`}
                  className={`rounded-[1.75rem] border p-6 ${
                    isFeatured ? 'border-[#7f8a62] bg-white shadow-sm shadow-[#7f8a62]/10' : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">{plan.tagline}</div>
                      <h3 className="mt-2 text-2xl font-black text-stone-900">{plan.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-[#875d5d]">{plan.price}</div>
                      {isFeatured && (
                        <div className="mt-2 rounded-full bg-[#7f8a62] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                          Most Popular
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="mt-5 text-sm font-semibold leading-7 text-stone-900">{guidance.bestFor}</p>
                  <p className="mt-4 text-sm leading-7 text-stone-700">{guidance.explanation}</p>

                  <div className="mt-5 space-y-3">
                    {guidance.differences.map((difference) => (
                      <div key={difference} className="flex gap-3 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#7f8a62]" />
                        <span>{difference}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[1.25rem] bg-[#f7f8f1] px-4 py-4 text-sm leading-7 text-stone-700">
                    <span className="font-semibold text-stone-900">How to choose:</span> {guidance.recommendation}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
