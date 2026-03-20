import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { fetchBuyerEntitlementByEmail, isEntitlementActive } from '../../lib/massagedeskosEntitlements';
import { isOwnerEmail } from '../../lib/massagedeskosAdmin';
import { isOwnerPreviewEnabled } from '../../lib/massagedeskosAccess';

export function BuyerProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [entitlementLoading, setEntitlementLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkAccess = async () => {
      if (!user?.email) {
        setAllowed(false);
        setEntitlementLoading(false);
        return;
      }

      if (isOwnerPreviewEnabled() && isOwnerEmail(user.email)) {
        setAllowed(true);
        setEntitlementLoading(false);
        return;
      }

      setEntitlementLoading(true);
      try {
        const entitlement = await fetchBuyerEntitlementByEmail(user.email);
        if (!cancelled) {
          setAllowed(isEntitlementActive(entitlement));
        }
      } catch {
        if (!cancelled) {
          setAllowed(false);
        }
      } finally {
        if (!cancelled) {
          setEntitlementLoading(false);
        }
      }
    };

    void checkAccess();

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  if (loading || entitlementLoading) {
    return (
      <div className="min-h-[40vh] grid place-items-center text-sm text-stone-600">
        Verifying your paid access...
      </div>
    );
  }

  if (!allowed) {
    return (
      <Navigate
        to="/products/massagedeskos/login"
        replace
        state={{ from: location.pathname, reason: 'entitlement_required' }}
      />
    );
  }

  return <>{children}</>;
}
