import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import { handleError } from "@/lib/error";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();
    const { email, password } = body;

    try {
        const result = await authenticateUser(email, password);
        if (!result) throw new Error("Ugyldig email eller adgangskode");

        const res = NextResponse.json(result);

        res.cookies.set("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax" as const,
            path: "/",
            maxAge: Number(process.env.TOKEN_REFRESH_EXPIRATION_SECS),
        });

        return res;
    } catch (error: unknown) {
        return NextResponse.json(
            { message: handleError(error) },
            { status: 400 }
        );
    }
};
