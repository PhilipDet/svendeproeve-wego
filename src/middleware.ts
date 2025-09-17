import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const { pathname } = req.nextUrl;

    if (
        (!refreshToken && pathname === "/dashboard") ||
        (!refreshToken && pathname.startsWith("/booking"))
    ) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard", "/booking/:path*"],
};
