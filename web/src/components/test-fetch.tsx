import { useQuery } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';

const fetchFirstUser = async () => {
  console.log('fetching...');
  const data = await trpc.userList.query();
  console.log(`got data:`, data[0]);

  if (data.length === 0) return null;
  return data[0];
};

export function TestFetch() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['userList'],
    queryFn: fetchFirstUser,
  });

  if (isPending) return <p>FETCHING...</p>;
  if (isError) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>NO DATA</p>;

  return (
    <div>
      <p>FETCHED!</p>
      <p>{`ID: ${data.id}`}</p>
      <p>{`Name: ${data.name}`}</p>
    </div>
  );
}
