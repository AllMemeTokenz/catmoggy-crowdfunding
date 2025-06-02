import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;

    const isApiRoute = req.nextUrl.pathname.startsWith('/api/admin');

    if (isApiRoute && !token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const isAdminRoute = req.nextUrl.pathname.startsWith('/dashboardzzz');

    if (isAdminRoute && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      authorized: ({ token }) => true, // We'll handle auth logic ourselves
    },
  }
);

export const config = {
  matcher: ['/api/admin/:path*', '/dashboardzzz/:path*'],
};
