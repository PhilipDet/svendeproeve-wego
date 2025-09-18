"use server";

import { handlePrismaError } from "@/lib/error";
import { prisma } from "@/lib/prisma";

export const getSlides = async () => {
    try {
        const result = await prisma.slide.findMany({
            select: {
                imageUrl: true,
                text: true,
            },
        });

        if (!result) throw new Error("No slides found");

        return result.map((slide) => ({
            imageUrl: slide.imageUrl,
            text: slide.text,
        }));
    } catch (error: unknown) {
        throw new Error(handlePrismaError(error)?.message || "Database error");
    }
};
