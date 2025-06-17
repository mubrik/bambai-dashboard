import 'server-only';

import {redirect} from 'next/navigation';
import {verifyCookieToken} from './shared/serverCookie';
import apiClient from './shared/apiClient';
import {API_ENDPOINTS} from '@endpoints';
import type {User} from '@src/types';

export async function isUserAuthenticated(opts?: {redirectPage?: boolean}) {
  const {redirectPage} = opts ?? {redirectPage: true};
  const token = await verifyCookieToken();

  if (!token) {
    if (redirectPage) redirect('/login');
    return {isAuth: false, user: null};
  }

  try {
    // TODO, make a new endpoint to simply verify token, no need for user data, so it's super fast
    const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
    return {isAuth: true, user: response.data};
  } catch (err) {
    if (redirectPage) redirect('/login');
    return {isAuth: !!err, user: null};
  }
}
