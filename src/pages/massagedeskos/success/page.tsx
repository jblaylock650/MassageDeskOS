import { Link } from 'react-router-dom';

export default function MassageDeskSuccessPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f2f7ef_0%,#ffffff_55%,#f9f6ef_100%)] px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-emerald-200 bg-white p-10 shadow-xl shadow-emerald-100/60">
        <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
          Payment Success
        </div>
        <h1 className="mt-5 font-serif text-5xl leading-tight text-stone-900">Your purchase was received.</h1>
        <p className="mt-5 text-sm leading-7 text-stone-700">
          Next step: create or open your buyer portal access so you can install the app, review onboarding steps, and start
          using MassageDeskOS. In a full live Stripe integration, this page would also confirm your purchase session server-side.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/products/massagedeskos/login"
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Open Buyer Access
          </Link>
          <Link
            to="/buyers/massagedeskos"
            className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-500"
          >
            Go To Buyer Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
