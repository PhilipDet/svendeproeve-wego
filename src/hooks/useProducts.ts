import { useEffect, useState } from "react";
import { handleError } from "@/lib/error";

export const useProducts = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    "https://fakestoreapi.com/products?limit=10",
                    {
                        headers: { "Content-Type": "application/json" },
                    }
                );

                const result = await res.json();

                if (!res.ok)
                    throw new Error(
                        result.message || "Failed to fetch products"
                    );

                const filteredResult = result.filter(
                    (product: any) => product.price <= 100
                );

                setProducts(filteredResult);
            } catch (error: unknown) {
                console.error(handleError(error));
                setError(handleError(error));
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return { products, loading, error };
};
