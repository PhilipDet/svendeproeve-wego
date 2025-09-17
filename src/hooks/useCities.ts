import { useEffect, useState } from "react";
import { getTripCities } from "@/services/trips";
import { handleError } from "@/lib/error";

export const useCities = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [citiesDeparture, setCitiesDeparture] = useState<string[]>([]);
    const [citiesDestination, setCitiesDestination] = useState<string[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true);
            try {
                const response = await getTripCities();

                if (!response) throw new Error("No cities found");

                setCitiesDeparture(response.citiesDeparture);
                setCitiesDestination(response.citiesDestination);
            } catch (error) {
                console.error("Error fetching cities:", handleError(error));
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    return { citiesDeparture, citiesDestination, loading };
};
