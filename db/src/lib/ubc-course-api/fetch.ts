import {
  ApiCoursesResponse,
  ApiCoursesResponseSchema,
  ApiCourseData,
  ApiSectionsResponse,
  ApiSectionsResponseSchema,
  ApiSectionData,
} from './schema';
import process from 'node:process';

function getApiUrl(): string {
  const url = process.env.COURSES_API_URL;
  if (!url) {
    throw new Error('COURSES_API_URL env var not set');
  }
  return url;
}

// limit specifies the maximum number of courses the function will try for.
// it is possible to get more courses than this number if the API happens to provide more.
export async function fetchCourses(limit?: number): Promise<ApiCourseData[]> {
  let data: ApiCourseData[] = [];

  const startingUrl = new URL('jsonapi/node/course', getApiUrl()).toString();
  let url: string | undefined = startingUrl;

  while (url) {
    const page = await fetchCoursesPage(url);
    console.log(`got ${page.data.length} courses from ${url}`);
    data = data.concat(page.data); // concat is generally faster than spread

    if (limit && data.length >= limit) {
      break;
    }

    url = page.links?.next?.href;
  }

  return data;
}
async function fetchCoursesPage(url: string): Promise<ApiCoursesResponse> {
  const response = await fetch(url);
  const json = await response.json();

  const { success, data, error } = ApiCoursesResponseSchema.safeParse(json);
  if (!success) {
    console.log(error.issues);
    throw new Error('Failed to parse course page');
  }

  return data;
}

export async function fetchSections(courseId: string): Promise<ApiSectionData[]> {
  let data: ApiSectionData[] = [];

  const startingUrl = new URL('jsonapi/node/section', getApiUrl());
  startingUrl.searchParams.set('filter[field_course.id]', courseId);
  let url: string | undefined = startingUrl.toString();

  while (url) {
    const page = await fetchSectionsPage(url);
    data = data.concat(page.data); // concat is generally faster than spread
    url = page.links?.next?.href;
  }

  return data;
}
async function fetchSectionsPage(url: string): Promise<ApiSectionsResponse> {
  const response = await fetch(url);
  const json = await response.json();

  const { success, data, error } = ApiSectionsResponseSchema.safeParse(json);
  if (!success) {
    console.log(error.issues);
    throw new Error('Failed to parse section page');
  }

  return data;
}
