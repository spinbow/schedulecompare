import { createFileRoute } from '@tanstack/react-router';
import { TestReg } from '../../components/test-reg';
import { H1 } from '@/components/ui/shadcn/typography';

export const Route = createFileRoute('/app/account')({
  component: Account,
});

function Account() {
  return (
    <div>
      <H1>Account page</H1>
      <TestReg />
    </div>
  );
}
