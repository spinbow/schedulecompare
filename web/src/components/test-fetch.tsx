import { useState, useEffect } from 'react';
import { trpc } from '../lib/trpc';
import type { Course } from '../../../db/src/schema';

const fetchCourses = async (input: string, setResults: (value: Course[]) => void) => {
  const data = await trpc.searchCourses.query({ query: input });
  setResults(data);
};

export function TestFetch() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Course[]>([]);

  useEffect(() => {
    if (input.trim() === '') return;
    fetchCourses(input, setResults);
  }, [input]);

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      {results.map((result) => (
        <p key={result.id}>{result.code}</p>
      ))}
    </div>
  );
}

// const fetchFirstUser = async () => {
//   console.log('fetching...');
//   const data = await trpc.userList.query();
//   console.log(`got data:`, data[0]);

//   if (data.length === 0) return null;
//   return data[0];
// };

// export function TestFetch() {
//   const { isPending, isError, data, error } = useQuery({
//     queryKey: ['userList'],
//     queryFn: fetchFirstUser,
//   });

//   if (isPending) return <p>FETCHING...</p>;
//   if (isError) return <p>ERROR: {error.message}</p>;
//   if (!data) return <p>NO DATA</p>;

//   return (
//     <div>
//       <p>FETCHED!</p>
//       <p>{`ID: ${data.id}`}</p>
//       <p>{`Name: ${data.name}`}</p>
//     </div>
//   );
// }
