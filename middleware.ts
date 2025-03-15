import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "./routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    console.log(isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return NextResponse.next(); // Changed from null
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next(); // Changed from null
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname
        if(nextUrl.search){
            callbackUrl+= nextUrl.search
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl)
        return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    return NextResponse.next(); // Changed from null
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
