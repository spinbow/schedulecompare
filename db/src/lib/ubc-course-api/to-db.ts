import { Course, Section, Session, Term } from '../../schema';
import { ApiCourseData, ApiSectionData } from './schema';

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;

type SessionTermData = {
  year: string; // e.g. '2024'
  session: Session;
  term: Term;
};

export function apiCourseDataToDbCourse(data: ApiCourseData): Course {
  const attr = data.attributes;

  return {
    id: data.id,
    code: attr.field_course_code,
    title: attr.title,
  };
}

export function apiSectionDataToDbSection(courseId: string, data: ApiSectionData): Section {
  const attr = data.attributes;
  const timeData = datesToSessionTermData(attr.field_start_date, attr.field_end_date);

  const startTime = attr.field_start_time ? formatTime(attr.field_start_time) : null;
  const endTime = attr.field_end_time ? formatTime(attr.field_end_time) : null;

  return {
    id: data.id,
    courseId,

    code: attr.field_section_number,
    year: timeData.year,
    session: timeData.session,
    term: timeData.term,

    startTime,
    endTime,

    monday: attr.field_days.includes('m'),
    tuesday: attr.field_days.includes('t'),
    wednesday: attr.field_days.includes('w'),
    thursday: attr.field_days.includes('th'),
    friday: attr.field_days.includes('f'),
  };
}

// formats time in seconds to a string in the format "HH:MM"
function formatTime(time: number): string {
  const hours = Math.floor(time / SECONDS_IN_HOUR);
  const minutes = Math.floor((time % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);

  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours}:${minutesStr}`;
}

// takes dates in format YYYY-MM-DD
// kinda long and cursed, theres probably a cleaner way to do this.
function datesToSessionTermData(startDate: string, endDate: string): SessionTermData {
  const startSplit = startDate.split('-');
  const endSplit = endDate.split('-');

  const startYear = startSplit[0];

  const startMonth = startSplit[1];
  const endMonth = endSplit[1];

  if (startMonth === '09') {
    // start of winter term
    if (endMonth === '12') {
      return {
        year: startYear,
        session: 'w',
        term: '1',
      };
    } else {
      return {
        year: startYear,
        session: 'w',
        term: null,
      };
    }
  } else if (startMonth === '01') {
    // winter term 2
    return {
      year: (parseInt(startYear) - 1).toString(),
      session: 'w',
      term: '2',
    };
  } else if (startMonth === '05') {
    // start of summer term
    if (endMonth === '6') {
      return {
        year: startYear,
        session: 's',
        term: '1',
      };
    } else {
      return {
        year: startYear,
        session: 's',
        term: null,
      };
    }
  } else if (startMonth === '07') {
    // summer term 2
    return {
      year: startYear,
      session: 's',
      term: '2',
    };
  } else {
    throw new Error(`Unknown session and term combo: ${startDate} ${endDate}`);
  }
}
