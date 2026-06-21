import { Link } from '@tanstack/react-router';
import { Button } from '@/components/shadcn/ui/button';
import { authClient } from '../lib/auth';

export function AppNav() {
  return (
    <nav>
      <Button asChild variant="ghost">
        <Link to="/">Schedule Compare</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/app/account">Account</Link>
      </Button>
      <Button variant="outline" onClick={() => authClient.signOut()}>
        Sign Out
      </Button>
    </nav>
  );
}
