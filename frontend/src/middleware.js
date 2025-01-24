// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Define public paths
    const isPublicPath = path === '/login' || 
                        path === '/register' || 
                        path === '/';

    const token = request.cookies.get('token')?.value || '';

    // Redirect logic for public paths
    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

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
        '/dashboard/:path*'
    ]
}