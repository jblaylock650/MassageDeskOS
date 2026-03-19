import { Link } from 'react-router-dom';

export default function MassageDeskCancelPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff5ef_0%,#ffffff_55%,#f8f4ee_100%)] px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-amber-200 bg-white p-10 shadow-xl shadow-amber-100/50">
        <div className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
          Checkout Not Completed
        </div>
        <h1 className="mt-5 font-serif text-5xl leading-tight text-stone-900">Your checkout was canceled.</h1>
        <p className="mt-5 text-sm leading-7 text-stone-700">
          No problem. You can return to pricing, compare the plans again, and restart checkout whenever you are ready.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/products/massagedeskos/pricing"
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Return To Pricing
          </Link>
          <Link
            to="/products/massagedeskos"
            className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-500"
          >
            Back To Landing Page
          </Link>
        </div>
      </div>
    </div>
  );
}
