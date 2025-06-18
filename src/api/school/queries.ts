import {useSuspenseQuery} from '@tanstack/react-query';
import useFetchOptsInternal from '../shared/useFetchOptsInternal';
import {useSearchParams} from 'next/navigation';
import {getSchoolsWithFiltersQueryOpts} from './shared';
import type {PaginatedItem, School, BaseParams} from '@src/types';

export function useGetSchoolsWithFilter(params: BaseParams) {
  return useFetchOptsInternal({
    queryOpts: getSchoolsWithFiltersQueryOpts(params),
  });
}

export function useGetSchoolsWithFilterSuspense() {
  const params = useSearchParams();
  const _params = params ? Object.fromEntries(params.entries()) : {};
  return useSuspenseQuery<PaginatedItem<School>>(getSchoolsWithFiltersQueryOpts(_params));
}
