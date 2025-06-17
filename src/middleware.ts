import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/schools', '/students', '/projects'];
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  console.log('here 1');
  // 3. get token
  const token = (await cookies()).get('token')?.value;
  console.log('here 2', token);
  // 4. Redirect to /login if no token
  if (isProtectedRoute && !token) {
    console.log('here 3');
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  // 5. if public route and token is present, redirect to dashboard
  if (isPublicRoute && token && publicRoutes.includes(path)) {
    console.log('here 4');
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }
  console.log('here 5');
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
