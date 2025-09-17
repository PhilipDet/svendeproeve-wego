"use server";

import { prisma } from "@/lib/prisma";
import { handlePrismaError } from "@/lib/error";

export const getBookings = async (tripId: number) => {
    try {
        const results = await prisma.booking.findMany({
            where: {
                tripId: tripId,
            },

            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        imageUrl: true,
                    },
                },
            },
        });

        if (!results) throw new Error("No bookings found");

        return results;
    } catch (error: unknown) {
        console.log(error);

        throw new Error(handlePrismaError(error)?.message || "Database error");
    }
};
