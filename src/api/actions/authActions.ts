'use server';

import {redirect} from 'next/navigation';
import {createCookieToken, deleteCookieToken} from '../shared/serverCookie';

export async function storeCookie(data: {token: string; redirectToRoot?: boolean}) {
  'use server';
  const {token, redirectToRoot} = data;
  await createCookieToken(token);
  if (redirectToRoot) {
    redirect('/');
  }
}

export async function clearCookie() {
  'use server';
  await deleteCookieToken();
  redirect('/login');
}

