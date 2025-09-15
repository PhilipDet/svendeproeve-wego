import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/services/user";
import { getUserIdFromToken } from "@/lib/auth";
import { handleError } from "@/lib/error";

export const GET = async (req: NextRequest) => {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        const userId = getUserIdFromToken(token);
        if (!userId) {
            throw new Error("Ugyldig token");
        }

        const user = await getUser(userId);
        if (!user) {
            throw new Error("Bruger blev ikke fundet");
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json(
            { message: handleError(error) },
            { status: 400 }
        );
    }
};
