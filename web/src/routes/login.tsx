import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/shadcn/button';
import { LoginForm } from '@/components/login-form';

export const Route = createFileRoute('/login')({
  component: LogIn,
});

function LogIn() {
  return (
    <div>
      <Button asChild variant="outline">
        <Link to="/">Back to home</Link>
      </Button>
      <LoginForm />
    </div>
  );
}
