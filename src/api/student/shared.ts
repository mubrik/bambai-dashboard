import {queryOptsFactory} from '../shared/queryOptionsFactory';
import {API_ENDPOINTS} from '@endpoints';
import {QUERY_KEYS} from '@src/constants/queryKeys';
import {STUDENT_TABLE_SEARCH_SCHEMA} from '@src/constants/schemas';
import type {PaginatedItem, Student, BaseParams} from '@src/types';

export function getStudentsWithFiltersQueryOpts(params: BaseParams) {
  const validateParams = STUDENT_TABLE_SEARCH_SCHEMA.parse(params);

  return queryOptsFactory<PaginatedItem<Student>>({
    queryKey: QUERY_KEYS.STUDENTS.ACTIVE_FILTERED(validateParams),
    url: API_ENDPOINTS.STUDENTS.ACTIVE_FILTERED(validateParams),
  });
}
