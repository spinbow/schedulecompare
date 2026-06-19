import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/account')({
  component: Account,
});

function Account() {
  return <p>Account page</p>;
}
