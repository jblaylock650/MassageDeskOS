import { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/feature/ProtectedRoute';
import { BuyerProtectedRoute } from '../components/feature/BuyerProtectedRoute';
import { OwnerProtectedRoute } from '../components/feature/OwnerProtectedRoute';

const HomePage = lazy(() => import('../pages/home/page'));
const MassageDeskLandingPage = lazy(() => import('../pages/massagedeskos/landing/page'));
const MassageDeskPricingPage = lazy(() => import('../pages/massagedeskos/pricing/page'));
const MassageDeskLoginPage = lazy(() => import('../pages/massagedeskos/login/page'));
const MassageDeskPortalPage = lazy(() => import('../pages/massagedeskos/portal/page'));
const MassageDeskSuccessPage = lazy(() => import('../pages/massagedeskos/success/page'));
const MassageDeskCancelPage = lazy(() => import('../pages/massagedeskos/cancel/page'));
const MassageDeskAdminLoginPage = lazy(() => import('../pages/massagedeskos/admin/login/page'));
const MassageDeskAdminPage = lazy(() => import('../pages/massagedeskos/admin/page'));
const MassageDeskAdminResetPasswordPage = lazy(() => import('../pages/massagedeskos/admin/reset-password/page'));
const FeedPage = lazy(() => import('../pages/feed/page'));
const ProfilePage = lazy(() => import('../pages/profile/page'));
const ProfileEditPage = lazy(() => import('../pages/profile/edit/page'));
const MessagesPage = lazy(() => import('../pages/messages/page'));
const FriendsPage = lazy(() => import('../pages/friends/page'));
const GroupsPage = lazy(() => import('../pages/groups/page'));
const EventsPage = lazy(() => import('../pages/events/page'));
const MarketplacePage = lazy(() => import('../pages/marketplace/page'));
const NotificationsPage = lazy(() => import('../pages/notifications/page'));
const SettingsPage = lazy(() => import('../pages/settings/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MassageDeskLandingPage />,
  },
  {
    path: '/theralinknetwork',
    element: <HomePage />,
  },
  {
    path: '/products/massagedeskos',
    element: <MassageDeskLandingPage />,
  },
  {
    path: '/products/massagedeskos/pricing',
    element: <MassageDeskPricingPage />,
  },
  {
    path: '/products/massagedeskos/login',
    element: <MassageDeskLoginPage />,
  },
  {
    path: '/products/massagedeskos/success',
    element: <MassageDeskSuccessPage />,
  },
  {
    path: '/products/massagedeskos/cancel',
    element: <MassageDeskCancelPage />,
  },
  {
    path: '/products/massagedeskos/admin/login',
    element: <MassageDeskAdminLoginPage />,
  },
  {
    path: '/products/massagedeskos/admin/reset-password',
    element: <MassageDeskAdminResetPasswordPage />,
  },
  {
    path: '/products/massagedeskos/admin',
    element: (
      <OwnerProtectedRoute>
        <MassageDeskAdminPage />
      </OwnerProtectedRoute>
    ),
  },
  {
    path: '/buyers/massagedeskos',
    element: (
      <BuyerProtectedRoute>
        <MassageDeskPortalPage />
      </BuyerProtectedRoute>
    ),
  },
  {
    path: '/feed',
    element: (
      <ProtectedRoute>
        <FeedPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile/edit',
    element: (
      <ProtectedRoute>
        <ProfileEditPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/messages',
    element: (
      <ProtectedRoute>
        <MessagesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/friends',
    element: (
      <ProtectedRoute>
        <FriendsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/groups',
    element: (
      <ProtectedRoute>
        <GroupsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events',
    element: (
      <ProtectedRoute>
        <EventsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/marketplace',
    element: (
      <ProtectedRoute>
        <MarketplacePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/notifications',
    element: (
      <ProtectedRoute>
        <NotificationsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
];

export default routes;
