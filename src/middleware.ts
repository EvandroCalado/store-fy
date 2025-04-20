import { NextRequest, NextResponse } from 'next/server';

import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';

import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(request: NextRequest) {
  const session = await auth();

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: true,
    cookieName: '__Secure-next-auth.session-token',
  });
  const { pathname } = request.nextUrl;

  console.log(token);
  console.log(session);

  if (!session) {
    const loginUrl = new URL(`/sign-in?callbackUrl=${pathname}`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith('/admin') && token?.role !== 'admin') {
    const loginUrl = new URL('/', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/shipping-address',
    '/payment-method',
    '/place-order',
    '/profile',
    '/user/:path*',
    '/order/:path*',
    '/admin/:path*',
  ],
};
