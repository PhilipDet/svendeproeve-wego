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
                        id: true,
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
        throw new Error(handlePrismaError(error)?.message || "Database error");
    }
};

export const createBooking = async (data: {
    numSeats: number;
    message?: string;
    userId: number;
    tripId: number;
}) => {
    try {
        const result = await prisma.booking.create({
            data: {
                numSeats: data.numSeats,
                comment: data.message || "",
                userId: data.userId,
                tripId: data.tripId,
            },
        });

        return {
            status: 200,
            message: "Booking created successfully",
            data: result,
        };
    } catch (error: unknown) {
        return {
            status: 500,
            message: handlePrismaError(error)?.message || "Database error",
        };
    }
};
