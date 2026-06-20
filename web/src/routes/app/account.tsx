import { createFileRoute } from '@tanstack/react-router';
import { TestReg } from '../../components/test-reg';

export const Route = createFileRoute('/app/account')({
  component: Account,
});

function Account() {
  return (
    <div>
      <h1>Account page</h1>
      <TestReg />
    </div>
  );
}
