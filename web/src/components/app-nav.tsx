import { Link } from '@tanstack/react-router';
import { authClient } from '../lib/auth';

export function AppNav() {
  return (
    <nav>
      <Link to="/">Schedule Compare</Link>
      <Link to="/app/account">Account</Link>
      <button onClick={() => authClient.signOut()}>Sign Out</button>
    </nav>
  );
}
