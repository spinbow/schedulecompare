import { ApiResponse, ApiResponseSchema, ApiCourseData } from './schema';

const STARTING_URL = 'https://courses.students.ubc.ca/jsonapi/node/course';

export async function fetchCourseData(): Promise<ApiCourseData[]> {
  const data: ApiCourseData[] = [];
  let url: string | undefined = STARTING_URL;

  while (url) {
    const page = await fetchPage(url);
    console.log(page.data);
    data.concat(page.data); // concat is generally faster than spread
    url = page.links?.next?.href;
  }

  return data;
}

async function fetchPage(url: string): Promise<ApiResponse> {
  const response = await fetch(url);
  const data = await response.json();

  const { success, data: parsedData, error } = ApiResponseSchema.safeParse(data);
  if (!success) {
    throw new Error('Failed to parse courses page', error);
  }

  return parsedData;
}
