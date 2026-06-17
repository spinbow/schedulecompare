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

export async function fetchCourses(): Promise<ApiCourseData[]> {
  const data: ApiCourseData[] = [];

  const startingUrl = new URL('jsonapi/node/course', getApiUrl()).toString();
  let url: string | undefined = startingUrl;

  while (url) {
    const page = await fetchCoursesPage(url);
    console.log(page.data);
    data.concat(page.data); // concat is generally faster than spread
    url = page.links?.next?.href;
  }

  return data;
}
async function fetchCoursesPage(url: string): Promise<ApiCoursesResponse> {
  const response = await fetch(url);
  const json = await response.json();

  const { success, data, error } = ApiCoursesResponseSchema.safeParse(json);
  if (!success) {
    throw new Error('Failed to parse course page', error);
  }

  return data;
}

export async function fetchSections(courseId: string): Promise<ApiSectionData[]> {
  const data: ApiSectionData[] = [];

  const startingUrl = new URL('jsonapi/node/section', getApiUrl());
  startingUrl.searchParams.set('filter[field_course.id]', courseId);
  let url: string | undefined = startingUrl.toString();

  while (url) {
    const page = await fetchSectionsPage(url);
    console.log(page.data);
    data.concat(page.data); // concat is generally faster than spread
    url = page.links?.next?.href;
  }

  return data;
}
async function fetchSectionsPage(url: string): Promise<ApiSectionsResponse> {
  const response = await fetch(url);
  const json = await response.json();

  console.log(json);
  const { success, data, error } = ApiSectionsResponseSchema.safeParse(json);
  if (!success) {
    throw new Error('Failed to parse section page', error);
  }

  return data;
}
