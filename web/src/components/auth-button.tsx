import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/shadcn/button';
import { authClient } from '../lib/auth';

export function AuthButton() {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) return <Button disabled>Getting user data...</Button>;
  if (error) return <Button disabled>Error: {error.message}</Button>;

  if (!data) {
    return (
      <Button asChild>
        <Link to="/login">Login</Link>
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link to="/app/account">Go to app</Link>
    </Button>
  );
}
