// src/middleware.js
import { NextResponse } from 'next/server';
import { cookiesList } from './lib';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Define public paths
    const isPublicPath = path === '/login' || path === '/register' || path === '/';

    const token = request.cookies.get(cookiesList.authorizationToken)?.value || '';

    // Redirect logic for protected paths
    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// matcher configuration
export const config = {
    matcher: [
        '/login',
        '/signup',
        '/dashboard',
        '/',
        '/dashboard/instructor',
        '/dashboard/instructor/courses/:path*',
    ]
}