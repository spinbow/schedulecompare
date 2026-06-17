import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { useEffect, useState } from 'react';
import type { AppRouter } from '@schedulecompare/api';
import type { User } from '@schedulecompare/shared';

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

function App() {
  const [count, setCount] = useState(0);
  const [fetchedData, setFetchedData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching...');
      const data = await trpc.userList.query();
      console.log(`got data:`, data[0]);
      setFetchedData(data[0]);
    };
    fetchData();
  }, []);

  return (
    <>
      <button type="button" onClick={() => setCount((count) => count + 1)}>
        Count is {count}
      </button>
      {fetchedData ? (
        <div>
          <p>{`ID: ${fetchedData.id}`}</p>
          <p>{`Name: ${fetchedData.name}`}</p>
        </div>
      ) : (
        <p>FETCHING...</p>
      )}
    </>
  );
}

export default App;
