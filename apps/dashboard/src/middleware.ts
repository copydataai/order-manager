import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    // TODO: change "session" cookie name by other more secure
    const cookie = request.cookies.get("session");
    if (cookie) {
        // TODO: add refresh session supabase jwt
        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith("/auth")) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*.webp|.ico).*)"],
};
