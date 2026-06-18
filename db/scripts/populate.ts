import { fetchCourses } from '../src/lib/ubc-course-api/fetch';
import { fetchSections } from '../src/lib/ubc-course-api/fetch';
import 'dotenv/config';
import process from 'node:process';
import {
  apiCourseDataToDbCourse,
  apiSectionDataToDbSection,
} from '../src/lib/ubc-course-api/to-db';
import { createDatabaseClient } from '../src/client';
import { coursesTable, sectionsTable } from '../src/schema';

// script for fetching and populating data in the database.
// use --limit or -L to specify the number of courses to fetch

const args = process.argv.slice(2);

// parse limit arg
let limitIdx = args.indexOf('--limit');
if (limitIdx === -1) limitIdx = args.indexOf('-L');

let limit = undefined;
if (limitIdx !== -1) {
  const limitArg = args[limitIdx + 1];
  limit = parseInt(limitArg);
  console.log(`Fetching ${limit} courses...`);
} else {
  console.log(`Fetching all available courses...`);
}

const db = createDatabaseClient();

// fetch and insert course data
const apiCourses = await fetchCourses(limit);
console.log(`Fetched ${apiCourses.length} courses.`);

const courses = apiCourses.map(apiCourseDataToDbCourse);
await db.insert(coursesTable).values(courses);

// fetch and insert section data
for (const apiCourse of apiCourses) {
  const apiSections = await fetchSections(apiCourse.id);
  console.log(
    `Fetched ${apiSections.length} sections for ${apiCourse.attributes.field_course_code}.`,
  );

  if (apiSections.length === 0) continue;

  const sections = apiSections.map((s) => apiSectionDataToDbSection(apiCourse.id, s));
  await db.insert(sectionsTable).values(sections);
}
