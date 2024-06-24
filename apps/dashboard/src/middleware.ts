import type { NextRequest } from "next/server";

import { updateSession } from "~/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
