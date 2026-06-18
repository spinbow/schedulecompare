import { createFileRoute } from '@tanstack/react-router';
import { TestFetch } from '../components/test-fetch';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return <TestFetch />;
}
