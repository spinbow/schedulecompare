import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: LogIn,
});

function LogIn() {
  return <p>Log in page</p>;
}
