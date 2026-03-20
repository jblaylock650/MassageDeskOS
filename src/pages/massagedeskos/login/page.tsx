import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchBuyerEntitlementByEmail, isEntitlementActive } from '../../../lib/massagedeskosEntitlements';
import { clearPendingPlan, getPendingPlan, getPlanById } from '../../../lib/massagedeskosAccess';
import { supabase } from '../../../lib/supabase';

export default function MassageDeskBuyerLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signInWithEmail } = useAuth();
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
  const reason = (location.state as { reason?: string; from?: string } | null)?.reason;
  const redirectTarget = ((location.state as { from?: string } | null)?.from) || '/buyers/massagedeskos';

  const entitlementMessage = useMemo(() => {
    if (reason !== 'entitlement_required') return '';
    return 'This portal is unlocked by paid entitlement. Sign in with the same email used at checkout.';
  }, [reason]);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      setMode('sign-in');
    }
  }, [user?.email]);

  const verifyEntitlementAndRoute = async (targetEmail: string) => {
    const entitlement = await fetchBuyerEntitlementByEmail(targetEmail);
    if (!isEntitlementActive(entitlement)) {
      throw new Error(
        'We could not find an active license for this email yet. Use the same checkout email or wait a moment for payment processing.',
      );
    }

    clearPendingPlan();
    navigate(redirectTarget);
  };

  const handleCreateAccess = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail || !password.trim() || !name.trim()) {
        throw new Error('Name, email, and password are required.');
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            name: name.trim(),
            company: company.trim(),
            product: 'massagedeskos',
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      const { error: signInError } = await signInWithEmail(normalizedEmail, password);
      if (signInError) {
        const signInMessage = signInError.message.toLowerCase();
        if (signInMessage.includes('email not confirmed')) {
          throw new Error('Check your inbox to confirm your email, then sign in to unlock your portal.');
        }
        throw signInError;
      }

      await verifyEntitlementAndRoute(normalizedEmail);
      setMessage('Your paid access is active. Redirecting to your portal...');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to create buyer access right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const { error: signInError } = await signInWithEmail(normalizedEmail, password);
      if (signInError) {
        throw signInError;
      }

      await verifyEntitlementAndRoute(normalizedEmail);
      setMessage('Paid access verified. Redirecting...');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to sign in right now.');
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
            <h1 className="mt-4 font-serif text-4xl leading-tight">Unlock your paid MassageDeskOS portal.</h1>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Sign in with the same email used at checkout. Your account is unlocked from active paid entitlement in our secure
              license table.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.2em] text-white/60">Checkout selection</div>
              <div className="mt-3 text-2xl font-bold">
                {pendingPlanData ? pendingPlanData.name : 'No local plan selected'}
              </div>
              <p className="mt-3 text-sm leading-7 text-white/75">
                {pendingPlanData
                  ? `${pendingPlanData.price} selected. Complete sign-in to unlock portal access for this purchase.`
                  : 'If you already paid, sign in with your checkout email to verify entitlement and enter the portal.'}
              </p>
            </div>

            <div className="mt-8 space-y-4 text-sm leading-7 text-white/75">
              <p><span className="font-semibold text-white">No subscription fatigue:</span> one-time purchase model.</p>
              <p><span className="font-semibold text-white">Private by design:</span> access is tied to your paid email entitlement.</p>
              <p><span className="font-semibold text-white">Fast path:</span> once entitlement verifies, you enter the portal immediately.</p>
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
                Create Buyer Account
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
                {mode === 'create' ? 'Create account and verify your purchase' : 'Sign in and verify your purchase'}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Access is granted when your signed-in email matches an active paid entitlement.
              </p>
            </div>

            {entitlementMessage && (
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                {entitlementMessage}
              </div>
            )}
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
                  placeholder="Practice or business name (optional)"
                  className="rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Checkout email"
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
                  {loading ? 'Creating account...' : 'Create Account and Verify Access'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignIn} className="mt-8 grid gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Checkout email"
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
                  {loading ? 'Verifying access...' : 'Open Buyer Portal'}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
