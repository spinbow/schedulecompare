import { useState, useEffect } from 'react';
import { trpc } from '../lib/trpc';
import {
  SessionSchema,
  type Course,
  type Section,
  type SectionWithCourse,
  type Session,
} from '../../../db/src/schema';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { H2, P } from '@/components/ui/shadcn/typography';

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

const fetchRegSections = async (setResults: (value: SectionWithCourse[]) => void) => {
  const data = await trpc.getRegisteredSections.query();
  setResults(data);
};

const registerSection = async (sectionId: string) => {
  await trpc.registerSection.mutate({ id: sectionId });
};

const unregisterSection = async (sectionId: string) => {
  await trpc.unregisterSection.mutate({ id: sectionId });
};

export function TestReg() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [regSections, setRegSections] = useState<SectionWithCourse[]>([]);

  // fetch registered courses, should replace with proper tanstack query later
  useEffect(() => {
    fetchRegSections(setRegSections);
  }, []);

  const selectedCourseDisplay = () => {
    if (!selectedCourse) return null;

    return (
      <div>
        <P>Selected course:</P>
        <P>{selectedCourse.code}</P>
        <P>{selectedCourse.title}</P>
        <Button variant="outline" onClick={() => setSelectedCourse(null)}>
          clear
        </Button>
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
            regSections={regSections}
            setRegSections={setRegSections}
          />
        </>
      ) : (
        <CourseSelector onSelect={setSelectedCourse} />
      )}
      <RegisteredCourses regSections={regSections} setRegSections={setRegSections} />
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
      <H2>Course Selector</H2>
      <Input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      {results.map((result) => (
        <div key={result.id}>
          <P>{result.code}</P>
          <P>{result.title}</P>
          <Button onClick={() => onSelect(result)}>select</Button>
        </div>
      ))}
    </div>
  );
}

function SectionDisplay({ section }: { section: Section | SectionWithCourse }) {
  return (
    <div>
      {'course' in section && (
        <P>
          Course: {section.course.code} - {section.course.title}
        </P>
      )}
      <P>Code: {section.code}</P>
      <P>Term: {section.term}</P>
    </div>
  );
}

function SectionSelector({
  course,
  registerSection,
  regSections,
  setRegSections,
}: {
  course: Course;
  registerSection: (sectionId: string) => void;
  regSections: SectionWithCourse[];
  setRegSections: (value: SectionWithCourse[]) => void;
}) {
  const [year, setYear] = useState<string>('2026');
  const [session, setSession] = useState<Session>('w');
  const [results, setResults] = useState<Section[]>([]);

  useEffect(() => {
    fetchSections(course.id, year, session, setResults);
  }, [year, session]);

  const handleRegister = async (section: Section) => {
    const sectionWithcourse = { ...section, course };
    setRegSections([...regSections, sectionWithcourse]);
    registerSection(section.id);
  };

  return (
    <div>
      <H2>Section Selector</H2>
      <Input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
      <Input
        type="text"
        value={session}
        onChange={(e) => {
          const value = e.target.value;
          const { data: parsed, success } = SessionSchema.safeParse(value);
          if (!success) return;
          setSession(parsed);
        }}
      />
      {results.map((result) => {
        const isRegistered = regSections.some((section) => section.id === result.id);

        return (
          <div key={result.id}>
            <SectionDisplay section={result} />
            {isRegistered ? (
              <P>Registered</P>
            ) : (
              <Button onClick={() => handleRegister(result)}>register</Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function RegisteredCourses({
  regSections,
  setRegSections,
}: {
  regSections: SectionWithCourse[];
  setRegSections: (value: SectionWithCourse[]) => void;
}) {
  const handleUnregister = async (section: Section) => {
    setRegSections(regSections.filter((s) => s.id !== section.id));
    unregisterSection(section.id);
  };

  return (
    <div>
      <H2>Registered Courses</H2>
      {regSections.length === 0 && <P>No registered courses.</P>}
      {regSections.map((section) => (
        <div key={section.id}>
          <SectionDisplay section={section} />
          <Button variant="destructive" onClick={() => handleUnregister(section)}>
            unregister
          </Button>
        </div>
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
