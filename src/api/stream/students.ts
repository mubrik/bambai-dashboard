'use server';
import {redirect} from 'next/navigation';
import apiClient from '../shared/apiClient';
import {verifyToken} from '../shared/session';
import {API_ENDPOINTS} from '@src/constants/endpoints';
import {STUDENT_TABLE_SEARCH_SCHEMA} from '@schemas';
import type {PaginatedItem, Student, QueryFilterParams, ActionPromiseResponse} from '@types';

interface GetFilteredStudentsAction {
  searchParams?: Promise<{[key: string]: string | string[] | undefined}>;
  params?: QueryFilterParams;
}

export async function getFilteredStudents({
  searchParams,
  params,
}: GetFilteredStudentsAction): ActionPromiseResponse<PaginatedItem<Student>> {
  const hasToken = await verifyToken();
  if (!hasToken) {
    redirect('/login');
  }

  // maybe add access check here too?

  let _url = '';

  if (params) {
    _url = API_ENDPOINTS.STUDENTS.ACTIVE_FILTERED(params);
  } else if (searchParams) {
    const _params = await searchParams;
    const _validatedParams = STUDENT_TABLE_SEARCH_SCHEMA.parse(_params);
    _url = API_ENDPOINTS.STUDENTS.ACTIVE_FILTERED(_validatedParams);
  }

  if (!_url) {
    return {error: 'Invalid Parameters', data: null};
  }

  await new Promise((res) => setTimeout(res, 1000));

  const response = await apiClient.get<PaginatedItem<Student>>(_url);
  return {error: null, data: response.data};
}
