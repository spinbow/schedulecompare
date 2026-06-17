import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TestFetch } from './components/test-fetch';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TestFetch />
    </QueryClientProvider>
  );
}

export default App;
