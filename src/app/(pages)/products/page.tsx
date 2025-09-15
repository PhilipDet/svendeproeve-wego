"use client";

import { useProducts } from "@/hooks/useProducts";
import { useFilter } from "@/context/filterContext";
import { PriceSlider } from "@/components/priceSlider";
import { useMemo } from "react";
import Image from "next/image";
import { Container } from "@/components/container";

const ProductsPage = () => {
    const { products, loading, error } = useProducts();
    const { price } = useFilter();

    const filteredProducts = useMemo(() => {
        if (price === null) return products;
        return products.filter((product) => product.price <= price);
    }, [products, price]);

    return (
        <Container>
            <PriceSlider />

            <div className="w-full flex flex-col gap-7">
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                <hr className="w-full my-4 border-2 border-gray-900" />
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">Error: {error}</div>
                ) : (
                    <ul className="w-full grid grid-cols-2">
                        {filteredProducts.map((product) => (
                            <li
                                key={product.id}
                                className="flex flex-col items-center"
                            >
                                {product.title} - ${product.price}
                                <Image
                                    src={product.image}
                                    alt={`Image of ${product.title}`}
                                    width={150}
                                    height={150}
                                    quality={80}
                                    className="w-full h-full object-fill aspect-square"
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Container>
    );
};

export default ProductsPage;
