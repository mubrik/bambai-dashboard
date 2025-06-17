import {useMutation, MutateFunction} from '@tanstack/react-query';
import {getQueryClient} from '@queryclient';
import {getMessageFromAPIError} from './apiClient';
import useToast from '@providers/toastProvider/useToast';
import {APIError} from '@types';

interface UseMutationInternalProps<PayloadT, ReturnDataT> {
  mutationFn: MutateFunction<ReturnDataT, APIError, PayloadT>;
  queryKey?: string[] | readonly string[];
  mutationKey?: string[] | readonly string[];
  successMsg?: string;
  errorMsg?: string;
  showToastOnError?: boolean;
  onSuccess?: (data: ReturnDataT, variables: unknown, context: unknown) => void;
  onError?: (err: APIError, variables: PayloadT, context: unknown) => void;
  onMutate?: (variables: PayloadT) => void;
  onSettled?: () => void;
}

function useMutationInternal<PayloadT, ReturnDataT>({
  mutationFn,
  queryKey,
  successMsg,
  errorMsg,
  showToastOnError = true,
  onSuccess,
  onError,
  onMutate,
  onSettled,
  mutationKey,
}: UseMutationInternalProps<PayloadT, ReturnDataT>) {
  const queryClient = getQueryClient();
  const {toast} = useToast();

  return useMutation({
    mutationKey,
    mutationFn,
    onMutate: async (data) => {
      await queryClient.cancelQueries({queryKey: queryKey});
      onMutate?.(data);
      return {
        previousData: queryKey ? queryClient.getQueryData(queryKey) : undefined,
        data,
      };
    },
    onError: (err: APIError, data, context) => {
      if (queryKey && context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }

      onError?.(err, data, context);

      if (showToastOnError) {
        const _errMsg = getMessageFromAPIError(err);
        if (errorMsg || _errMsg) {
          toast({message: errorMsg ?? _errMsg, type: 'error', timeout: 10000});
        }
      }
    },
    onSuccess: (data, variables, context) => {
      onSuccess?.(data, variables, context);

      if (successMsg) {
        toast({message: successMsg, type: 'success', timeout: 5000});
      }

      void queryClient.invalidateQueries({queryKey: queryKey});
    },
    onSettled: () => {
      onSettled?.();
    },
  });
}

export default useMutationInternal;
