import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const refreshToken = req.cookies.get("refreshToken")?.value;
    const { pathname } = req.nextUrl;

    if (refreshToken && (pathname === "/login" || pathname === "/signup")) {
        const url = req.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    if (!refreshToken && pathname === "/dashboard") {
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/signup", "/dashboard"],
};
