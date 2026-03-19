import { Navigate, useLocation } from 'react-router-dom';
import { hasBuyerAccess } from '../../lib/massagedeskosAccess';

export function BuyerProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const allowed = hasBuyerAccess();

  if (!allowed) {
    return (
      <Navigate
        to="/products/massagedeskos/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
}
