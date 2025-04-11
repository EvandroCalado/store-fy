import { NextRequest, NextResponse } from 'next/server';

import NextAuth from 'next-auth';

import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth();

  if (!session) {
    const loginUrl = new URL(`/sign-in?callbackUrl=${pathname}`, request.url);
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
