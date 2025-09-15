import { NextResponse } from "next/server";

export const POST = async () => {
    const res = NextResponse.json({ message: "Logged out successfully" });

    res.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: 0,
    });

    return res;
};
