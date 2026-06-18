import { fetchCourses } from '../src/lib/ubc-course-api/fetch';
import { fetchSections } from '../src/lib/ubc-course-api/fetch';
import 'dotenv/config';
import process from 'node:process';
import {
  apiCourseDataToDbCourse,
  apiSectionDataToDbSection,
} from '../src/lib/ubc-course-api/to-db';

// script for fetching course data.
// use --limit or -L to specify the number of courses to fetch

const args = process.argv.slice(2);

// parse limit arg
const limitIdx = args.indexOf('--limit') ?? args.indexOf('-L');
let limit = undefined;
if (limitIdx !== -1) {
  const limitArg = args[limitIdx + 1];
  limit = parseInt(limitArg);
  console.log(`Fetching ${limit} courses...`);
} else {
  console.log(`Fetching all available courses...`);
}

const apiCourses = await fetchCourses(limit);
console.log(`Fetched ${apiCourses.length} courses.`);

const courses = apiCourses.map(apiCourseDataToDbCourse);
console.log(courses);

for (const apiCourse of apiCourses) {
  const apiSections = await fetchSections(apiCourse.id);
  console.log(
    `Fetched ${apiSections.length} sections for ${apiCourse.attributes.field_course_code}.`,
  );
  const sections = apiSections.map((s) => apiSectionDataToDbSection(apiCourse.id, s));
  console.log(sections);
}
