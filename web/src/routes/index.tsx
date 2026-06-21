import { createFileRoute } from '@tanstack/react-router';
import { AuthButton } from '../components/auth-button';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <h1>Schedule Compare</h1>
      <p>Welcome to Schedule Compare!</p>
      <AuthButton />
    </>
  );
}
