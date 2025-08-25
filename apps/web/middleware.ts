import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
    const sessionCookie = getSessionCookie(req);

    if(!sessionCookie){
        return NextResponse.redirect(new URL("/signup", req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/onboarding/:path*',
}