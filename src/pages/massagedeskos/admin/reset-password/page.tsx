import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';
import { isOwnerEmail } from '../../../../lib/massagedeskosAdmin';
import { supabase } from '../../../../lib/supabase';

export default function MassageDeskAdminResetPasswordPage() {
  const { session, user, updatePassword, loading } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [working, setWorking] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [recoveryLoading, setRecoveryLoading] = useState(true);

  const sessionEmail = user?.email || session?.user?.email || '';
  const allowedOwner = useMemo(() => isOwnerEmail(sessionEmail), [sessionEmail]);
  const hasRecoverySession = Boolean(session || recoveryReady);

  useEffect(() => {
    let cancelled = false;

    const establishRecoverySession = async () => {
      setRecoveryLoading(true);
      setError('');

      try {
        const searchParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
        const code = searchParams.get('code');
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const recoveryType = hashParams.get('type');

        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
          if (!cancelled) {
            setRecoveryReady(true);
            window.history.replaceState({}, document.title, window.location.pathname);
          }
          return;
        }

        if (accessToken && refreshToken && recoveryType === 'recovery') {
          const { error: setSessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (setSessionError) throw setSessionError;
          if (!cancelled) {
            setRecoveryReady(true);
            window.history.replaceState({}, document.title, window.location.pathname);
          }
          return;
        }

        if (session) {
          if (!cancelled) {
            setRecoveryReady(true);
          }
          return;
        }
      } catch (caughtError) {
        if (!cancelled) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : 'Unable to validate this reset link. Request a fresh password reset email.',
          );
        }
      } finally {
        if (!cancelled) {
          setRecoveryLoading(false);
        }
      }
    };

    void establishRecoverySession();

    return () => {
      cancelled = true;
    };
  }, [session]);

  if (!loading && session && user && allowedOwner && message) {
    return <Navigate to="/products/massagedeskos/admin" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setWorking(true);

    try {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession();

      if (!activeSession) {
        throw new Error('This reset link is missing a valid recovery session. Request a fresh password reset email.');
      }

      if (!allowedOwner) {
        throw new Error('This recovery flow is restricted to the authorized MassageDeskOS owner accounts.');
      }

      if (password.length < 8) {
        throw new Error('Use a password that is at least 8 characters long.');
      }

      if (password !== confirmPassword) {
        throw new Error('Your passwords do not match.');
      }

      const result = await Promise.race([
        updatePassword(password),
        new Promise<never>((_, reject) => {
          window.setTimeout(() => reject(new Error('Password update timed out. Please request a fresh reset email.')), 15000);
        }),
      ]);

      const { error: updateError } = result;
      if (updateError) {
        throw updateError;
      }

      setMessage('Password updated. You can now return to the admin login with your new password.');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to update your password right now.');
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4efe5_0%,#fffdfa_55%,#f7f2e9_100%)] px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <Link to="/products/massagedeskos/admin/login" className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">
          Back to Admin Login
        </Link>

        <section className="mt-8 rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-xl shadow-stone-200/50">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#875d5d]">Owner Password Recovery</div>
          <h1 className="mt-3 font-serif text-4xl text-stone-900">Set a new admin password</h1>
          <p className="mt-4 text-sm leading-7 text-stone-700">
            This page completes the Supabase recovery flow for the MassageDeskOS owner accounts. Use it only from the password
            reset email link.
          </p>

          <div className="mt-5 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
            Recovery session email: <span className="font-semibold text-stone-900">{sessionEmail || 'Not detected yet'}</span>
          </div>

          {recoveryLoading && (
            <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
              Validating your reset link and establishing the recovery session...
            </div>
          )}

          {!recoveryLoading && !hasRecoverySession && !error && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              No valid recovery session was detected on this page. Request a fresh password reset email from the admin login.
            </div>
          )}

          {!allowedOwner && !loading && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              This recovery link is not tied to an authorized owner account. Request a fresh reset email from the admin login page.
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="New password"
              className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-[#7f8a62] focus:ring-2 focus:ring-[#7f8a62]/15"
            />
            <button
              type="submit"
              disabled={working || recoveryLoading || !allowedOwner || !hasRecoverySession}
              className="w-full rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {working ? 'Updating password...' : 'Save new password'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
