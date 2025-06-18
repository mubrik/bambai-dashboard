import Cookies from 'js-cookie';

/**
 * Gets the authentication token from cookies
 * @returns {string | undefined} The auth token or undefined if not found
 */
export function getAuthToken(): string | undefined {
  return Cookies.get('token');
}

/**
 * Sets the authentication token in cookies, ideally shouldnt ever need to call thisa stoken will be
 * set from nextjs side
 * @param token - The token to store
 * @param expires - Number of days until cookie expires (default: 7)
 */
export function setAuthToken(token: string, expires: number = 7): void {
  Cookies.set('token', token, {expires, path: '/', secure: true, sameSite: 'lax'});
}

/**
 * Removes the authentication token from cookies
 */
export function removeAuthToken(): void {
  Cookies.remove('token', {path: '/'});
}
