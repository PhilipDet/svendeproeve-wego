"use server";

import { prisma } from "@/lib/prisma";
import { handlePrismaError } from "@/lib/error";

export const getTrips = async () => {
    console.log("Getting trips from database...");

    try {
        const results = await prisma.trip.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        imageUrl: true,

                        reviewsRecieved: {
                            select: {
                                numStars: true,
                            },
                        },
                    },
                },

                bookings: {
                    select: {
                        id: true,
                        numSeats: true,
                    },
                },
            },
        });

        if (!results) throw new Error("Trips not found");

        return results.map((trip) => ({
            id: trip.id,
            user: { ...trip.user, imageUrl: trip.user.imageUrl ?? undefined },
            reviewsReceived: trip.user.reviewsRecieved.map(
                (review) => review.numStars
            ),
            bookings: trip.bookings.map((booking) => booking.numSeats),
            departureDate: trip.departureDate,
            addressDeparture: trip.addressDeparture,
            cityDeparture: trip.cityDeparture,
            addressDestination: trip.addressDestination,
            cityDestination: trip.cityDestination,
            seatsTotal: trip.seatsTotal,
            pricePerSeat: trip.pricePerSeat.toNumber(),
            bagSizeId: trip.bagSizeId,
            hasComfort: trip.hasComfort,
            useFerry: trip.useFerry,
            isElectric: trip.isElectric,
            allowChildren: trip.allowChildren,
            allowSmoking: trip.allowSmoking,
            allowMusic: trip.allowMusic,
            allowPets: trip.allowPets,
        }));
    } catch (error: unknown) {
        throw new Error(handlePrismaError(error)?.message || "Database error");
    }
};

export const getTrip = async (id: number) => {
    try {
        const result = await prisma.trip.findUnique({
            where: { id },
        });
        if (!result) throw new Error("Trip not found");
        return {
            ...result,
            pricePerSeat: result.pricePerSeat.toNumber(),
        };
    } catch (error: unknown) {
        throw new Error(handlePrismaError(error)?.message || "Database error");
    }
};
