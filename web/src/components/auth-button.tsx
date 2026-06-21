import { Link } from '@tanstack/react-router';
import { authClient } from '../lib/auth';

export function AuthButton() {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) return <button disabled>Getting user data...</button>;
  if (error) return <button disabled>Error: {error.message}</button>;

  if (!data) return <Link to="/signin">Login</Link>;

  return <Link to="/app/account">Go to app</Link>;
}
