import {QueryFunction, queryOptions} from '@tanstack/react-query';
import apiClient from './apiClient';

interface OptsParam<T> {
  queryKey: string[] | readonly string[];
  url?: string;
  queryFn?: QueryFunction<T>;
}

export function queryOptsFactory<T>({queryFn, queryKey, url = ''}: OptsParam<T>) {
  const defaultQueryFunc = async ({signal}: {signal: AbortSignal}) => {
    const response = await apiClient.get<T>(url, {signal});
    return response.data;
  };
  return queryOptions({queryKey, queryFn: queryFn ?? defaultQueryFunc});
}
