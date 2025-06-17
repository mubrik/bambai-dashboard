import {useEffect} from 'react';
import {useQuery, UseQueryOptions, QueryKey} from '@tanstack/react-query';
import useToast from '@providers/toastProvider/useToast';
import {APIError} from '@types';

interface UseFetchInternalProps<
  TQueryFnData = unknown,
  TError = APIError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> {
  errorMsg?: string;
  showToastOnError?: boolean;
  queryOpts: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
}

function useFetchOptsInternal<
  TQueryFnData = unknown,
  TError = APIError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  queryOpts,
  errorMsg = 'An error occured fetching that request',
  showToastOnError = true,
}: UseFetchInternalProps<TQueryFnData, TError, TData, TQueryKey>) {
  const {toast} = useToast();

  const data = useQuery<TQueryFnData, TError, TData, TQueryKey>(queryOpts);

  useEffect(() => {
    if (data.isError && showToastOnError) {
      toast({type: 'error', message: errorMsg, show: true});
    }
  }, [data.isError, showToastOnError, errorMsg, toast]);

  return data;
}

export default useFetchOptsInternal;
