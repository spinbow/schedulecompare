import { createFileRoute } from '@tanstack/react-router';
import { TestFetch } from '../../components/test-fetch';

export const Route = createFileRoute('/app/account')({
  component: Account,
});

function Account() {
  return (
    <div>
      <h1>Account page</h1>
      <TestFetch />
    </div>
  );
}
