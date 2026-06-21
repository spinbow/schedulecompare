import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/shadcn/button';
import { SignupForm } from '@/components/signup-form';

export const Route = createFileRoute('/signup')({
  component: SignUp,
});

function SignUp() {
  return (
    <div>
      <Button asChild variant="outline">
        <Link to="/">Back to home</Link>
      </Button>
      <SignupForm />
    </div>
  );
}
