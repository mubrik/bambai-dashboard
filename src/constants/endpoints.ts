import {filterParamsToUrlQuery} from '@utils/helpers';
import type {QueryFilterParams} from '@src/types';

export const API_ENDPOINTS = {
  AUTH: {
    ME: '/me',
    SIGNIN: '/auth/signin',
    OTP_SIGNIN: '/auth/otp-signin',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    SEND_OTP: 'auth/otp-signin/init',
  },
  USERS: {
    BASE: '/users',
    DETAILS: (id: string) => `/users/${id}`,
  },
  SCHOOLS: {
    BASE: '/schools',
    DETAILS: (id: string) => `/schools/${id}`,
    CLASSES: (schoolId: string) => `/schools/${schoolId}/classes`,
    FILTERED: (params?: QueryFilterParams) => {
      const queryString = params ? filterParamsToUrlQuery(params) : '';
      return `/schools${queryString ? `?${queryString}` : ''}`;
    },
  },
  STUDENTS: {
    BASE: '/students',
    ACTIVE_FILTERED: (params?: QueryFilterParams) => {
      const queryString = params ? filterParamsToUrlQuery(params) : '';
      return `/active-students${queryString ? `?${queryString}` : ''}`;
    },
  },
} as const;
