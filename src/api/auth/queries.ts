'use client';
import {useCallback} from 'react';
import apiClient, {getMessageFromAPIError} from '../shared/apiClient';
import useMutationInternal from '../shared/useMutationInternal';
import {removeAuthToken} from '../shared/localCookie';
import {getAuthUserQueryOpts} from './shared';
import {storeCookie, clearCookie} from '../actions/authActions';
import {getQueryClient} from '@queryclient';
import useToast from '@providers/toastProvider/useToast';
import {QUERY_KEYS} from '@queryKeys';
import {API_ENDPOINTS} from '@endpoints';
import type {User, LoginUserData} from '@types';
import useFetchOptsInternal from '../shared/useFetchOptsInternal';

export function useAuthLogin() {
  const queryClient = getQueryClient();
  const {toast} = useToast();

  return useMutationInternal<LoginUserData, {user: User; accessToken: string}>({
    showToastOnError: false,
    mutationFn: async (data) => {
      const {type, ...rest} = data;
      const _url = type === 'otp' ? API_ENDPOINTS.AUTH.OTP_SIGNIN : API_ENDPOINTS.AUTH.SIGNIN;
      const response = await apiClient.post(_url, rest);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        queryClient.setQueryData(QUERY_KEYS.AUTH.ME, data.user);
        void storeCookie({token: data.accessToken, redirectToRoot: true});
      }
    },
    onError: (err, data) => {
      const _defErrMsg =
        data?.type === 'otp' ? 'OTP Incorrect. Please enter a valid OTP' : 'Incorrect Email ID / Password';
      const msg = getMessageFromAPIError(err, _defErrMsg);
      toast({type: 'error', message: msg, show: true, anchor: {vertical: 'bottom', horizontal: 'right'}});
    },
  });
}

export function useAuthSendOTP() {
  const {toast} = useToast();

  return useMutationInternal<{email: string; sms?: string}, {message: string}>({
    showToastOnError: false,
    mutationKey: ['send-otp'],
    mutationFn: async (data) => {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.SEND_OTP, data);
      return response.data;
    },
    onError: (err) => {
      const msg = getMessageFromAPIError(err, 'Incorrect Email ID / Password');
      toast({
        type: 'error',
        message: msg,
        show: true,
        anchor: {vertical: 'bottom', horizontal: 'right'},
        timeout: 5000,
      });
    },
  });
}

export function useAuthUser() {
  return useFetchOptsInternal({
    queryOpts: getAuthUserQueryOpts(),
    showToastOnError: false,
  });
}

export function useLogout() {
  const queryClient = getQueryClient();

  return useCallback(async () => {
    removeAuthToken();
    await clearCookie();
    queryClient.clear();
  }, [queryClient]);
}
