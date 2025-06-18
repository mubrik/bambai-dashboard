"use client"
import {useSuspenseQuery} from '@tanstack/react-query';
import useFetchOptsInternal from '../shared/useFetchOptsInternal';
import {useSearchParams} from 'next/navigation';
import {getStudentsWithFiltersQueryOpts} from './shared';
import type {PaginatedItem, Student, BaseParams} from '@src/types';

export function useGetStudentsWithFilter(params: BaseParams) {
  return useFetchOptsInternal({
    queryOpts: getStudentsWithFiltersQueryOpts(params),
  });
}

export function useGetStudentsWithFilterSuspense() {
  const params = useSearchParams();
  const _params = params ? Object.fromEntries(params.entries()) : {};
  return useSuspenseQuery<PaginatedItem<Student>>(getStudentsWithFiltersQueryOpts(_params));
}
