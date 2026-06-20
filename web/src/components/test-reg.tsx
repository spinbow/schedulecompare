import { useState, useEffect, useMemo } from 'react';
import { trpc } from '../lib/trpc';
import {
  SessionSchema,
  type Course,
  type CourseRegistration,
  type Section,
  type Session,
} from '../../../db/src/schema';

const fetchCourses = async (input: string, setResults: (value: Course[]) => void) => {
  const data = await trpc.searchCourses.query({ query: input });
  setResults(data);
};

const fetchSections = async (
  courseId: string,
  year: string,
  session: Session,
  setResults: (value: Section[]) => void,
) => {
  const data = await trpc.getSections.query({ courseId, year, session });
  setResults(data);
};

const fetchRegSectionIds = async (setResults: (value: string[]) => void) => {
  const data = await trpc.getRegistrations.query();
  const ids = data.map((reg) => reg.sectionId);
  setResults(ids);
};

const registerSection = async (sectionId: string) => {
  await trpc.registerSection.mutate({ id: sectionId });
};

export function TestReg() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [regSectionIds, setRegSectionIds] = useState<string[]>([]);

  // fetch registered courses, should replace with proper tanstack query later
  useEffect(() => {
    fetchRegSectionIds(setRegSectionIds);
  }, []);

  const selectedCourseDisplay = () => {
    if (!selectedCourse) return null;

    return (
      <div>
        <p>Selected course:</p>
        <p>{selectedCourse.code}</p>
        <p>{selectedCourse.title}</p>
        <button onClick={() => setSelectedCourse(null)}>clear</button>
      </div>
    );
  };

  return (
    <div>
      {selectedCourse ? (
        <>
          {selectedCourseDisplay()}
          <SectionSelector
            course={selectedCourse}
            registerSection={registerSection}
            regSectionIds={regSectionIds}
            setRegSectionIds={setRegSectionIds}
          />
        </>
      ) : (
        <CourseSelector onSelect={setSelectedCourse} />
      )}
      <RegisteredCourses regSectionIds={regSectionIds} />
    </div>
  );
}

function CourseSelector({ onSelect }: { onSelect: (course: Course) => void }) {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Course[]>([]);

  useEffect(() => {
    if (input.trim() === '') return;
    fetchCourses(input, setResults);
  }, [input]);

  return (
    <div>
      <h2>Course Selector</h2>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      {results.map((result) => (
        <div key={result.id}>
          <p>{result.code}</p>
          <p>{result.title}</p>
          <button onClick={() => onSelect(result)}>select</button>
        </div>
      ))}
    </div>
  );
}

function SectionSelector({
  course,
  registerSection,
  regSectionIds,
  setRegSectionIds,
}: {
  course: Course;
  registerSection: (sectionId: string) => void;
  regSectionIds: string[];
  setRegSectionIds: (value: string[]) => void;
}) {
  const [year, setYear] = useState<string>('2026');
  const [session, setSession] = useState<Session>('w');
  const [results, setResults] = useState<Section[]>([]);

  useEffect(() => {
    fetchSections(course.id, year, session, setResults);
  }, [year, session]);

  const handleRegister = async (section: Section) => {
    setRegSectionIds([...regSectionIds, section.id]);
    registerSection(section.id);
  };

  return (
    <div>
      <h2>Section Selector</h2>
      <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
      <input
        type="text"
        value={session}
        onChange={(e) => {
          const value = e.target.value;
          const { data: parsed, success } = SessionSchema.safeParse(value);
          if (!success) return;
          setSession(parsed);
        }}
      />
      {results.map((result) => (
        <div key={result.id}>
          <p>Code: {result.code}</p>
          <p>Term: {result.term}</p>
          {regSectionIds.includes(result.id) ? (
            <p>Registered</p>
          ) : (
            <button onClick={() => handleRegister(result)}>register</button>
          )}
        </div>
      ))}
    </div>
  );
}

function RegisteredCourses({ regSectionIds }: { regSectionIds: string[] }) {
  return (
    <div>
      <h2>Registered Courses</h2>
      {regSectionIds.map((id) => (
        <p key={id}>{id}</p>
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
