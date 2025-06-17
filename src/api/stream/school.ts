'use server';
import {redirect} from 'next/navigation';
import apiClient from '../shared/apiClient';
import {verifyToken} from '../shared/session';
import {API_ENDPOINTS} from '@src/constants/endpoints';
import {SCHOOL_TABLE_SEARCH_SCHEMA} from '@schemas';
import type {PaginatedItem, School, QueryFilterParams, ActionPromiseResponse} from '@types';

interface GetFilteredSchoolsAction {
  searchParams?: Promise<{[key: string]: string | string[] | undefined}>;
  params?: QueryFilterParams;
}

export async function getFilteredSchools({
  searchParams,
  params,
}: GetFilteredSchoolsAction): ActionPromiseResponse<PaginatedItem<School>> {
  const hasToken = await verifyToken();
  if (!hasToken) {
    redirect('/login');
  }

  // maybe add access check here too?

  let _url = '';

  if (params) {
    _url = API_ENDPOINTS.SCHOOLS.FILTERED(params);
  } else if (searchParams) {
    const _params = await searchParams;
    const _validatedParams = SCHOOL_TABLE_SEARCH_SCHEMA.parse(_params);
    _url = API_ENDPOINTS.SCHOOLS.FILTERED(_validatedParams);
  }

  if (!_url) {
    return {error: 'Invalid Parameters', data: null};
  }

  const response = await apiClient.get<PaginatedItem<School>>(_url);
  return {error: null, data: response.data};
}
