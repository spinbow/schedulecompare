import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { AppNav } from '../../components/app-nav';
import { useEffect } from 'react';
import { authClient } from '../../lib/auth';

export const Route = createFileRoute('/app')({
  component: AppLayout,
});

function AppLayout() {
  const { data, isPending } = authClient.useSession();
  const location = useLocation();
  const navigate = useNavigate();

  // if user is on bare app, nav to account page
  useEffect(() => {
    if (location.pathname === '/app/') {
      navigate({ to: '/app/account' });
    }
  }, []);

  // route users away from app when not authenticated
  useEffect(() => {
    if (!isPending && !data) {
      navigate({ to: '/signin' });
    }
  }, [data, isPending]);

  return (
    <>
      <AppNav />
      <Outlet />
    </>
  );
}
