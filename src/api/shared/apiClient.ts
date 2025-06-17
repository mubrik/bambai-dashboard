import axios, {isAxiosError} from 'axios';
import {ErrorResponse, APIError} from '@src/types';

const isServerSide = typeof window === 'undefined';

const apiClient = axios.create({
  baseURL: (isServerSide ? process.env.PRIVATE_URL : process.env.NEXT_PUBLIC_PUBLIC_URL) + '/api/',
  timeout: 20000,
});

function transformToAPIError(error: Error): APIError {
  return isAxiosError<ErrorResponse>(error) && error.response
    ? {data: error.response.data, status: error.response.status ?? 500}
    : {data: {message: 'An Unexpected Error Occured'}, status: 500};
}

// regular request interceptors
apiClient.interceptors.request.use(
  async function (config) {
    if (isServerSide) {
      const {cookies} = await import('next/headers'),
        token = (await cookies()).get('token')?.value;
      if (token) {
        config.headers['x-access-token'] = `${token}`;
      }
    } else {
      const {getAuthToken} = await import('./localCookie'),
        token = getAuthToken();
      if (token) {
        config.headers['x-access-token'] = `${token}`;
      }
    }

    return config;
  },
  function (error: Error) {
    // Do something with request error
    // add refresh token logic later
    const _err = transformToAPIError(error);
    return Promise.reject(_err);
  },
);

// regular response interceptors
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error: Error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const _err = transformToAPIError(error);
    return Promise.reject(_err);
  },
);

export function getMessageFromAPIError(error: APIError | null, errMsg = 'An error occured with taht request') {
  if (!error) {
    return '';
  }
  return error?.data?.message ?? error?.data?.error ?? errMsg;
}

export default apiClient;
