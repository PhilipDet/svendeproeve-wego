import { useEffect, useState } from "react";
import { getBookings } from "@/services/bookings";
import { handleError } from "@/lib/error";

export const useBookings = (tripId: number) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true);
            try {
                const response = await getBookings(tripId);

                if (!response) throw new Error("No bookings found");

                const nestedResponse = response.flatMap((booking) => {
                    return Array.from({ length: booking.numSeats }, () => ({
                        user: booking.user,
                    }));
                });

                console.log(nestedResponse);

                setBookings(nestedResponse);
            } catch (error) {
                console.error("Error fetching bookings:", handleError(error));
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    return { bookings, loadingBookings: loading };
};
