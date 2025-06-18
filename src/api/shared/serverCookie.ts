import 'server-only';

import {cookies} from 'next/headers';

export async function createCookieToken(token: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: false,
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

export async function verifyCookieToken() {
  const token = (await cookies()).get('token')?.value;
  return token;
}
