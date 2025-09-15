import { useEffect, useState } from "react";
import { getTrips } from "@/services/trips";
import { getTrip } from "@/services/trips";
import { handleError } from "@/lib/error";
import { TripType } from "@/lib/types";

export const useTrips = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [trips, setTrips] = useState<TripType[]>([]);

    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);
            try {
                const response = await getTrips();

                if (!response) throw new Error("No trips found");

                setTrips(response);
            } catch (error) {
                console.error("Error fetching trips:", handleError(error));
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    return { trips, loading };
};

export const useTrip = (id: number) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [trip, setTrip] = useState<TripType | null>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await getTrip(id);
                setTrip(response);
            } catch (error) {
                console.error("Error fetching trip:", handleError(error));
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id]);

    return { trip, loading };
};
