import {QueryFilterParams} from '@types';
import {filterParamsToUrlQuery} from '@utils/helpers';

export const QUERY_KEYS = {
  AUTH: {
    ALL: ['auth'],
    ME: ['auth', 'me'],
  },
  USERS: {
    ALL: ['users'],
    DETAILS: (id: string) => ['users', id],
  },
  SCHOOLS: {
    ALL: ['schools'],
    DETAILS: (id: string) => ['schools', id],
    CLASSES: (schoolId: string) => ['schools', schoolId, 'classes'],
    FILTERED: (params?: QueryFilterParams) => {
      const queryString = params ? filterParamsToUrlQuery(params) : '';
      const url = `/schools${queryString ? `?${queryString}` : ''}`;
      return ['schools', url];
    },
  },
  PROJECTS: {
    ALL: ['projects'],
    DETAILS: (id: string) => ['projects', id],
  },
  STUDENTS: {
    ALL: ['students'],
    ACTIVE_FILTERED: (params?: QueryFilterParams) => {
      const queryString = params ? filterParamsToUrlQuery(params) : '';
      const url = `/active-students${queryString ? `?${queryString}` : ''}`;
      return ['students', url];
    },
  },
} as const;
