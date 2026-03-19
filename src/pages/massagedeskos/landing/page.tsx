import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  activateOwnerPreviewFromUrl,
  isOwnerPreviewEnabled,
  plans,
  productInfo,
} from '../../../lib/massagedeskosAccess';

const highlights = [
  'Install it from your browser and use it like an app',
  'Keep client records, visits, and appointments in one place',
  'Stay organized without a monthly software stack',
  'Export backups anytime and optionally connect your own Google sync',
];

const featureBlocks = [
  {
    title: 'Client Management',
    body: 'Store client details, session notes, preferences, contact information, and mobile appointment context in one organized workspace.',
  },
  {
    title: 'Scheduling + Visits',
    body: 'Plan future sessions, log completed appointments, review visit history, and keep your daily workflow clean and easy to manage.',
  },
  {
    title: 'Therapist Wellness',
    body: 'Track workload, self-care, and recovery alongside client work so your practice stays sustainable as it grows.',
  },
];

const reasons = [
  'Built for solo and mobile massage therapists',
  'Designed to feel simple, private, and lightweight',
  'Works as a hosted installable PWA',
  'Lets you own your data and backup process',
];

const ownershipPillars = [
  {
    title: 'One-Time Purchase, Lifetime Use',
    body: 'Buy once and keep using your purchased version without recurring subscription pressure.',
  },
  {
    title: 'No Subscription Fatigue',
    body: 'No forced monthly app fee just to keep your daily workflow running.',
  },
  {
    title: 'Data Stays In Your Control',
    body: 'Your records are managed through your workspace and backups, not sold as ad-network inventory.',
  },
  {
    title: 'No Ad Clutter, No Feed Noise',
    body: 'No pushy ad placements, no distraction-heavy feed design, and no wasted visual space.',
  },
];

export default function MassageDeskLandingPage() {
  const [ownerPreview, setOwnerPreview] = useState(false);

  useEffect(() => {
    const activatedFromUrl = activateOwnerPreviewFromUrl();
    setOwnerPreview(activatedFromUrl || isOwnerPreviewEnabled());
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f3eb_0%,#fffdf8_35%,#f3efe6_100%)] text-stone-900">
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="font-black tracking-[0.18em] text-stone-800 uppercase">MassageDeskOS</div>
          <div className="flex items-center gap-3">
            <Link
              to="/products/massagedeskos/pricing"
              className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500"
            >
              Pricing
            </Link>
            <Link
              to="/products/massagedeskos/login"
              className="rounded-full bg-stone-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              Customer Login
            </Link>
          </div>
        </div>
      </header>

      <main>
        {ownerPreview && (
          <section className="mx-auto max-w-7xl px-6 pt-6">
            <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm leading-7 text-emerald-900">
              <span className="font-semibold">Owner preview mode is active.</span> Public visitors do not see internal testing controls.
            </div>
          </section>
        )}

        <section className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <div className="inline-flex rounded-full border border-[#d7c8aa] bg-[#fff4d8] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-stone-700">
              Local-First Practice Management
            </div>
            <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-tight text-stone-900 lg:text-7xl">
              The installable massage practice app built for therapists who want clarity, not clutter.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-stone-700 lg:text-xl">
              {productInfo.shortName} helps mobile and independent massage therapists manage clients, appointments,
              visits, wellness, and backups from one clean workspace they can install directly from the web.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products/massagedeskos/pricing"
                className="rounded-full bg-[#7f8a62] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7f8a62]/20 transition hover:-translate-y-0.5 hover:bg-[#6f7956]"
              >
                See Pricing
              </Link>
              <a
                href={productInfo.demoUrl}
                className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-500"
              >
                Open Live Demo App
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-3xl border border-stone-200 bg-white/80 p-5 shadow-sm">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#875d5d]">Why it helps</div>
                  <p className="mt-3 text-sm leading-6 text-stone-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-stone-200 bg-stone-950 p-4 shadow-2xl shadow-stone-300/40">
              <div className="rounded-[1.6rem] bg-[radial-gradient(circle_at_top,#f5d58c_0%,#a4ad80_42%,#875d5d_100%)] p-8 text-white">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/80">
                  <span>MassageDeskOS v8</span>
                  <span>Installable PWA</span>
                </div>
                <div className="mt-10 rounded-[1.5rem] bg-white/12 p-6 backdrop-blur">
                  <div className="text-sm uppercase tracking-[0.2em] text-white/70">What you can manage</div>
                  <div className="mt-5 space-y-4">
                    <div className="rounded-2xl bg-white/10 p-4">
                      <div className="text-lg font-semibold">Clients</div>
                      <p className="mt-2 text-sm text-white/85">Profiles, notes, contact details, preferences, and care context.</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <div className="text-lg font-semibold">Schedule</div>
                      <p className="mt-2 text-sm text-white/85">Appointments, mobile workflow planning, visit logs, and day-to-day visibility.</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                      <div className="text-lg font-semibold">Business Health</div>
                      <p className="mt-2 text-sm text-white/85">Reports, backups, therapist wellness tracking, and self-care accountability.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:pb-24">
          <div className="grid gap-6 lg:grid-cols-3">
            {featureBlocks.map((block) => (
              <article key={block.title} className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
                <h2 className="font-serif text-2xl text-stone-900">{block.title}</h2>
                <p className="mt-4 text-sm leading-7 text-stone-700">{block.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16 lg:pb-24">
          <div className="rounded-[2.5rem] border border-stone-200 bg-white px-8 py-10">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">Why Buyers Choose It</div>
            <h2 className="mt-3 font-serif text-4xl text-stone-900">Ownership over subscriptions, clarity over clutter.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-700">
              MassageDeskOS is built for practitioners who want to run a serious practice without getting trapped in
              endless monthly tool fatigue, intrusive ad-driven layouts, or confusing software bloat.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {ownershipPillars.map((pillar) => (
                <article key={pillar.title} className="rounded-[1.5rem] border border-stone-200 bg-[#fcfbf8] p-5">
                  <h3 className="text-lg font-bold text-stone-900">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white/80">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">Built For Real Practice</div>
                <h2 className="mt-3 font-serif text-4xl text-stone-900">Made for therapists who want a cleaner way to run the day.</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-stone-600">
                MassageDeskOS is best for independent therapists, mobile providers, and wellness professionals who want one
                dependable system instead of a pile of disconnected tools.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {reasons.map((reason) => (
                <div key={reason} className="rounded-[1.5rem] border border-stone-200 bg-[#fcfbf8] p-5 text-sm leading-7 text-stone-700">
                  {reason}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="rounded-[2.5rem] bg-stone-900 px-8 py-12 text-white lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5d58c]">Start Here</div>
                <h2 className="mt-4 font-serif text-4xl">Choose your plan and get access to the installable app.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
                  Review the license options, choose the level that fits your practice, and move into the customer access flow.
                </p>
              </div>
              <Link
                to="/products/massagedeskos/pricing"
                className="inline-flex items-center justify-center rounded-full bg-[#f5d58c] px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-[#f0cb70]"
              >
                View Plans
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="rounded-[2rem] border border-stone-200 bg-white px-8 py-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Available Plans</div>
                <div className="mt-3 flex flex-wrap gap-3">
                  {plans.map((plan) => (
                    <div key={plan.id} className="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700">
                      {plan.name} {plan.price}
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to="/products/massagedeskos/pricing"
                className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-500"
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
