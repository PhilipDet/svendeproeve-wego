import { useEffect, useState } from "react";
import { getContent } from "@/services/content";
import { handleError } from "@/lib/error";

export const useContent = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<{
        title: string;
        content: string;
    }>({ title: "", content: "" });

    useEffect(() => {
        const fetchCities = async () => {
            setLoading(true);
            try {
                const response = await getContent();

                if (!response) throw new Error("No content found");

                setContent(response);
            } catch (error) {
                console.error("Error fetching content:", handleError(error));
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    return { content, loadingContent: loading };
};
