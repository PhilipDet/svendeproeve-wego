import { useEffect, useState } from "react";
import { getBookingsByTripId, getBookingsByUserId } from "@/services/bookings";
import { handleError } from "@/lib/error";
import { BookingType } from "@/lib/types";

export const useBookingsByTripId = (tripId: number) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [bookings, setBookings] = useState<BookingType[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true);
            try {
                const response = await getBookingsByTripId(tripId);

                if (!response) throw new Error("No bookings found");

                const nestedResponse = response.flatMap(
                    (booking: BookingType) => {
                        return Array.from({ length: booking.numSeats }, () => ({
                            ...booking,
                            numSeats: 1,
                        }));
                    }
                );

                setBookings(nestedResponse);
            } catch (error) {
                console.error("Error fetching bookings:", handleError(error));
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, [tripId]);

    return { bookings, loadingBookings: loading };
};

export const useBookingsByUserId = (userId?: number | null) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [bookings, setBookings] = useState<BookingType[]>([]);
    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            if (!userId) return;

            try {
                const response = await getBookingsByUserId(userId);

                if (!response) throw new Error("No bookings found");

                setBookings(response);
            } catch (error) {
                console.error("Error fetching bookings:", handleError(error));
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [userId]);
    return { bookings, loadingBookings: loading };
};
