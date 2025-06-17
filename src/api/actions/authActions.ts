'use server';

import {redirect} from 'next/navigation';
import apiClient from '../shared/apiClient';
import {createCookieToken, deleteCookieToken} from '../shared/session';
import {API_ENDPOINTS} from '@src/constants/endpoints';
import type {User, ActionPromiseResponse, ActionResponse} from '@src/types';

export async function storeCookie(data: {token: string; redirectToRoot?: boolean}) {
  'use server';
  const {token, redirectToRoot} = data;
  await createCookieToken(token);
  if (redirectToRoot) {
    redirect('/');
  }
}

export async function clearCookie(): ActionPromiseResponse<null> {
  'use server';
  await deleteCookieToken();
  redirect('/login');
}

// delete, deprecate actions

interface LoginUser {
  email: string;
  password: string;
  url: string;
}

export async function loginUser(
  _: unknown,
  formData: LoginUser,
): ActionPromiseResponse<{user: User; accessToken: string}> {
  'use server';
  const {url, ...rest} = formData;

  const response = await apiClient.post<{user: User; accessToken: string}>(url, rest);

  /* if (!response.data.accessToken) throw Error("no token found"); */
  await createCookieToken(response.data.accessToken);
  redirect('/');
}

export async function logoutUser(): ActionPromiseResponse<null> {
  'use server';
  await deleteCookieToken();
  redirect('/login');
}
