"use server";

import { prisma } from "@/lib/prisma";
import { handlePrismaError } from "@/lib/error";

export const getBookingsByTripId = async (tripId: number) => {
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

export const getBookingsByUserId = async (userId: number) => {
    try {
        const results = await prisma.booking.findMany({
            where: {
                userId: userId,
            },

            select: {
                id: true,
                tripId: true,
                userId: true,
                comment: true,
                numSeats: true,

                trip: {
                    select: {
                        id: true,
                        departureDate: true,
                        cityDeparture: true,
                        addressDeparture: true,
                        cityDestination: true,
                        addressDestination: true,
                        seatsTotal: true,
                        bagSizeId: true,
                        pricePerSeat: true,
                        useFerry: true,
                        isElectric: true,
                        allowChildren: true,
                        allowPets: true,
                        allowMusic: true,
                        allowSmoking: true,

                        bagsize: true,

                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                imageUrl: true,
                            },
                        },
                    },
                },
            },
        });

        if (!results) throw new Error("No bookings found");

        return results.map((booking) => ({
            ...booking,
            trip: {
                ...booking.trip,
                pricePerSeat: Number(booking.trip.pricePerSeat),
            },
        }));
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
            message: "Din plads er booket!",
            data: result,
        };
    } catch (error: unknown) {
        return {
            status: 500,
            message: handlePrismaError(error)?.message || "Database error",
        };
    }
};

export const deleteBooking = async (bookingId: number) => {
    try {
        const result = await prisma.booking.delete({
            where: { id: bookingId },
        });

        if (!result) throw new Error("Booking not found");

        return {
            status: 200,
            message: "Din booking er nu annulleret",
        };
    } catch (error: unknown) {
        return {
            status: 500,
            message: handlePrismaError(error)?.message || "Database error",
        };
    }
};
