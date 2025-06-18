import {queryOptsFactory} from '../shared/queryOptionsFactory';
import {API_ENDPOINTS} from '@endpoints';
import {QUERY_KEYS} from '@src/constants/queryKeys';
import {SCHOOL_TABLE_SEARCH_SCHEMA} from '@src/constants/schemas';
import type {PaginatedItem, School, BaseParams} from '@src/types';

export function getSchoolsWithFiltersQueryOpts(params: BaseParams) {
  const validateParams = SCHOOL_TABLE_SEARCH_SCHEMA.parse(params);

  return queryOptsFactory<PaginatedItem<School>>({
    queryKey: QUERY_KEYS.SCHOOLS.FILTERED(validateParams),
    url: API_ENDPOINTS.SCHOOLS.FILTERED(validateParams),
  });
}
