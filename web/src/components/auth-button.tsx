import { Link } from '@tanstack/react-router';
import { Button } from '@/components/shadcn/ui/button';
import { authClient } from '../lib/auth';

export function AuthButton() {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) return <Button disabled>Getting user data...</Button>;
  if (error) return <Button disabled>Error: {error.message}</Button>;

  if (!data) {
    return (
      <Button asChild>
        <Link to="/signin">Login</Link>
      </Button>
    );
  }

  return (
    <Button asChild>
      <Link to="/app/account">Go to app</Link>
    </Button>
  );
}
