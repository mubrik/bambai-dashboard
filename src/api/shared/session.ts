import 'server-only';

import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import apiClient from './apiClient';
import {API_ENDPOINTS} from '@endpoints';
import type {User} from '@src/types';

export async function createCookieToken(token: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateCookieToken() {
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return null;
  }

  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteCookieToken() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}

export async function verifyToken() {
  const token = (await cookies()).get('token')?.value;
  return !!token;
}

export async function isUserAuthenticated(opts?: {redirectPage?: boolean}) {
  const {redirectPage} = opts ?? {redirectPage: true};
  const token = (await cookies()).get('token')?.value;

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
