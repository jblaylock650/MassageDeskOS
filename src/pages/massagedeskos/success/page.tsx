import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { fetchBuyerEntitlementByEmail, isEntitlementActive } from '../../../lib/massagedeskosEntitlements';

export default function MassageDeskSuccessPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState<'checking' | 'active' | 'pending'>('checking');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!user?.email) {
        setStatus('pending');
        return;
      }

      try {
        const entitlement = await fetchBuyerEntitlementByEmail(user.email);
        if (!cancelled) {
          setStatus(isEntitlementActive(entitlement) ? 'active' : 'pending');
        }
      } catch {
        if (!cancelled) {
          setStatus('pending');
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f2f7ef_0%,#ffffff_55%,#f9f6ef_100%)] px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-emerald-200 bg-white p-10 shadow-xl shadow-emerald-100/60">
        <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
          Payment Success
        </div>
        <h1 className="mt-5 font-serif text-5xl leading-tight text-stone-900">Your purchase was received.</h1>
        <p className="mt-5 text-sm leading-7 text-stone-700">
          Sign in with the same email used at checkout so we can verify your paid entitlement and unlock your portal access.
          Access is provisioned through Stripe webhook sync into Supabase entitlements.
        </p>
        <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
          {status === 'checking' && 'Checking your entitlement status...'}
          {status === 'active' && 'Access is active for this signed-in account. You can open the portal now.'}
          {status === 'pending' &&
            'Entitlement may still be processing or not signed in yet. Use buyer login with your checkout email and retry.'}
        </div>
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
