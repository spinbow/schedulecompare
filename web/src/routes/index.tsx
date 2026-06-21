import { createFileRoute } from '@tanstack/react-router';
import { AuthButton } from '../components/auth-button';
import { H1, P } from '@/components/ui/shadcn/typography';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <H1>Schedule Compare</H1>
      <P>Welcome to Schedule Compare!</P>
      <AuthButton />
    </>
  );
}
