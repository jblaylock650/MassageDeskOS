import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { isOwnerEmail, ownerEmails } from '../../../../lib/massagedeskosAdmin';

export default function MassageDeskAdminLoginPage() {
  const location = useLocation();
  const { user, signInWithEmail, signInWithGoogle, resetPasswordForEmail, signOut, clearStoredAuthState, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [working, setWorking] = useState(false);

  const signedInOwner = useMemo(() => isOwnerEmail(user?.email), [user?.email]);
  const signedInNonOwner = Boolean(user?.email && !isOwnerEmail(user.email));
  const denied = new URLSearchParams(location.search).get('denied') === '1';

  useEffect(() => {
    if (denied) {
      setError('The current signed-in account does not have owner access. Sign out that account and use an authorized owner email.');
    }
  }, [denied]);

  if (!loading && signedInOwner) {
    return <Navigate to="/products/massagedeskos/admin" replace />;
  }

  const handleEmailSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setWorking(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (!isOwnerEmail(normalizedEmail)) {
        throw new Error('This owner panel is restricted to the authorized Juxtaposed Tides owner accounts.');
      }

      if (user?.email && user.email.trim().toLowerCase() !== normalizedEmail) {
        await clearStoredAuthState();
      }

      const { error: signInError } = await signInWithEmail(normalizedEmail, password);
      if (signInError) {
        throw signInError;
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to sign in right now.');
    } finally {
      setWorking(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setMessage('');
    setWorking(true);

    try {
      if (user) {
        await signOut();
      }
      await signInWithGoogle('/products/massagedeskos/admin');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to start Google sign-in.');
      setWorking(false);
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setMessage('');
    setWorking(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (!isOwnerEmail(normalizedEmail)) {
        throw new Error('Enter one of the authorized owner emails first so we can send the reset link to the right inbox.');
      }

      const { error: resetError } = await resetPasswordForEmail(normalizedEmail);
      if (resetError) {
        throw resetError;
      }

      setMessage('Password reset email sent. Open it and use the MassageDeskOS reset page link to create a new password.');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to send the reset email right now.');
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4efe5_0%,#fffdfa_55%,#f7f2e9_100%)] px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <Link to="/products/massagedeskos" className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">
          Back to MassageDeskOS
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <section className="rounded-[2.5rem] bg-stone-950 p-10 text-white">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#f5d58c]">Owner Operations</div>
            <h1 className="mt-4 font-serif text-5xl leading-tight">Internal admin access for sales, fulfillment, and launch operations.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">
              This owner area is for Juxtaposed Tides only. Use it to track paid buyers, move each sale through the
              fulfillment pipeline, and keep tier 2 and tier 3 delivery work organized.
            </p>
            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-white/60">Authorized owners</div>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                {ownerEmails.map(ownerEmail => (
                  <div key={ownerEmail} className="rounded-2xl bg-white/10 px-4 py-3">
                    {ownerEmail}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-xl shadow-stone-200/50">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">Sign in</div>
            <h2 className="mt-3 font-serif text-3xl text-stone-900">Open the owner dashboard</h2>
            <p className="mt-4 text-sm leading-7 text-stone-700">
              Sign in with one of the owner emails above. Google sign-in is available if that account already exists in
              Supabase. Email/password works if you have credentials set up there already.
            </p>
            {signedInNonOwner && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-7 text-red-700">
                You are currently signed in as <span className="font-semibold">{user?.email}</span>, which is not on the owner
                allowlist. Sign out below, then log in with `jblaylock650@gmail.com` or `juxtaposedtidesmedia@gmail.com`.
              </div>
            )}
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
              If Google keeps reusing the wrong session, this button now clears the current app session first. If Google
              still auto-selects the wrong account, open this page in a private window for a clean account chooser.
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {message && (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={working}
              className="mt-6 w-full rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {working ? 'Starting Google sign-in...' : 'Continue with Google'}
            </button>

            {signedInNonOwner && (
              <button
                type="button"
                onClick={() => void clearStoredAuthState()}
                disabled={working}
                className="mt-4 w-full rounded-full border border-red-300 px-5 py-3 text-sm font-semibold text-red-700 transition hover:border-red-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Sign Out Current Non-Owner Account
              </button>
            )}

            <button
              type="button"
              onClick={() => void clearStoredAuthState()}
              disabled={working}
              className="mt-4 w-full rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Reset this browser&apos;s stuck login session
            </button>

            <div className="my-6 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
              <span className="h-px flex-1 bg-stone-200"></span>
              <span>or</span>
              <span className="h-px flex-1 bg-stone-200"></span>
            </div>

            <form className="space-y-4" onSubmit={handleEmailSignIn}>
              <input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Owner email"
                className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
              />
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Password"
                className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
              />
              <button
                type="submit"
                disabled={working}
                className="w-full rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {working ? 'Signing in...' : 'Sign in with email'}
              </button>
            </form>

            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={working}
              className="mt-4 text-sm font-semibold text-[#875d5d] underline underline-offset-4 transition hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Send password reset email
            </button>

            <div className="mt-8 rounded-[1.5rem] bg-stone-50 p-5 text-sm leading-7 text-stone-700">
              This panel is owner-only. If a non-owner signs in successfully but their email is not on the allowlist, they
              will still be blocked from the admin dashboard.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
