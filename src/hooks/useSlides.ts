import { useEffect, useState } from "react";
import { getSlides } from "@/services/slides";
import { handleError } from "@/lib/error";

export const useSlides = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [slides, setSlides] = useState<
        {
            imageUrl: string;
            text: string;
        }[]
    >([]);

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true);
            try {
                const response = await getSlides();
                console.log(response);

                if (!response) throw new Error("No slides found");

                setSlides(response);
            } catch (error) {
                console.error("Error fetching slides:", handleError(error));
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    return { slides, loadingSlides: loading };
};
