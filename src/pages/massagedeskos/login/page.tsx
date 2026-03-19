import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  completeStubPurchase,
  getBuyerSession,
  getPendingPlan,
  getPlanById,
  signInStub,
} from '../../../lib/massagedeskosAccess';

export default function MassageDeskBuyerLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<'sign-in' | 'create'>('create');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const pendingPlan = getPendingPlan();
  const pendingPlanData = getPlanById(pendingPlan);

  useEffect(() => {
    const session = getBuyerSession();
    if (session?.purchasedPlan) {
      setEmail(session.email);
      setName(session.name);
      setCompany(session.company || '');
      setMode('sign-in');
    }
  }, []);

  const redirectTarget =
    ((location.state as { from?: string } | null)?.from) || '/buyers/massagedeskos';

  const handleCreateAccess = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      completeStubPurchase(name, email, password, company);
      setMessage('Buyer access created. Redirecting to your portal...');
      navigate('/buyers/massagedeskos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create buyer access.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      signInStub(email, password);
      setMessage('Buyer access confirmed. Redirecting...');
      navigate(redirectTarget);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff2d6_0%,#f7f3eb_38%,#f3efe7_100%)] text-stone-900">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between">
          <Link to="/products/massagedeskos" className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">
            MassageDeskOS
          </Link>
          <Link to="/products/massagedeskos/pricing" className="text-sm font-semibold text-stone-700 hover:text-stone-900">
            Back to Pricing
          </Link>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="rounded-[2.5rem] bg-stone-950 p-8 text-white">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5d58c]">Customer Access</div>
            <h1 className="mt-4 font-serif text-4xl leading-tight">Access your MassageDeskOS customer portal.</h1>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Use this page after selecting your plan to continue into customer access and portal setup.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">Pending purchase</div>
              <div className="mt-3 text-2xl font-bold">
                {pendingPlanData ? pendingPlanData.name : 'No plan selected yet'}
              </div>
              <p className="mt-3 text-sm leading-7 text-white/75">
                {pendingPlanData
                  ? `${pendingPlanData.price} selected. Continue to unlock your customer portal.`
                  : 'Choose a plan first, then return here to continue your access setup.'}
              </p>
            </div>

            <div className="mt-8 space-y-4 text-sm leading-7 text-white/75">
              <p><span className="font-semibold text-white">Customer portal:</span> app access, onboarding, and support entry.</p>
              <p><span className="font-semibold text-white">Best next step:</span> choose your plan if you have not done that yet.</p>
              <p><span className="font-semibold text-white">Need to return later?</span> You can sign back in from this page.</p>
            </div>
          </aside>

          <section className="rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-xl shadow-stone-200/50">
            <div className="flex gap-2 rounded-full bg-stone-100 p-1">
              <button
                type="button"
                onClick={() => setMode('create')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === 'create' ? 'bg-stone-900 text-white' : 'text-stone-600'
                }`}
              >
                Create Buyer Access
              </button>
              <button
                type="button"
                onClick={() => setMode('sign-in')}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  mode === 'sign-in' ? 'bg-stone-900 text-white' : 'text-stone-600'
                }`}
              >
                Buyer Login
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-black text-stone-900">
                {mode === 'create' ? 'Create buyer access' : 'Log in to your buyer portal'}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {mode === 'create'
                  ? 'Use this after selecting your plan to continue into your customer access setup.'
                  : 'Use this to re-enter your customer portal after access has already been created.'}
              </p>
            </div>

            {error && <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
            {message && <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}

            {mode === 'create' ? (
              <form onSubmit={handleCreateAccess} className="mt-8 grid gap-4">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Buyer full name"
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <input
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Practice or business name"
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Buyer email"
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 rounded-full bg-[#7f8a62] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6d7654] disabled:opacity-60"
                >
                  {loading ? 'Creating access...' : 'Unlock Buyer Portal'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignIn} className="mt-8 grid gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Buyer email"
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Open Buyer Portal'}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
