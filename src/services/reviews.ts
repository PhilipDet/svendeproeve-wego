"use server";

import { prisma } from "../lib/prisma";
import { handlePrismaError } from "@/lib/error";

export const createReview = async ({
    numStars,
    comment,
    reviewerId,
    reviewedUserId,
}: {
    numStars: number;
    comment: string;
    reviewerId: number;
    reviewedUserId: number;
}) => {
    try {
        const result = await prisma.review.create({
            data: {
                numStars,
                comment,
                reviewerId,
                reviewedUserId,
            },
            include: {
                reviewer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        imageUrl: true,
                    },
                },
            },
        });

        return {
            status: 200,
            message: "Review created successfully",
            data: {
                id: result.id,
                numStars: result.numStars,
                comment: result.comment,
                createdAt: result.createdAt,
                reviewer: result.reviewer,
            },
        };
    } catch (error: unknown) {
        return {
            status: 500,
            message: handlePrismaError(error)?.message || "Database error",
        };
    }
};

export const deleteReview = async (reviewId: number) => {
    try {
        const result = await prisma.review.delete({
            where: { id: reviewId },
        });

        if (!result) throw new Error("Review not found");

        return {
            status: 200,
            message: "Review deleted successfully",
        };
    } catch (error: unknown) {
        return {
            status: 500,
            message: handlePrismaError(error)?.message || "Database error",
        };
    }
};
