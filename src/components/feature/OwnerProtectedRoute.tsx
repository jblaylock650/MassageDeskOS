import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isOwnerEmail } from '../../lib/massagedeskosAdmin';

export function OwnerProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f4ec]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#7f8a62] border-t-transparent"></div>
          <p className="text-stone-600">Checking owner access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/products/massagedeskos/admin/login" replace />;
  }

  if (!isOwnerEmail(user.email)) {
    return <Navigate to="/products/massagedeskos/admin/login?denied=1" replace />;
  }

  return <>{children}</>;
}
