"use server";

import { prisma } from "@/lib/prisma";
import { handlePrismaError } from "@/lib/error";

export const getContent = async () => {
    try {
        const results = await prisma.content.findMany({
            select: {
                title: true,
                content: true,
            },
        });

        if (!results) throw new Error("No content found");

        return {
            title: results[0].title,
            content: results[0].content,
        };
    } catch (error: unknown) {
        throw new Error(handlePrismaError(error)?.message || "Database error");
    }
};
