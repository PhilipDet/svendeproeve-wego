"use client";

import { FilterContextType } from "@/lib/types";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [price, setPrice] = useState<number | null>(null);

    return (
        <FilterContext.Provider
            value={{
                price,
                setPrice,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilterContext must be used inside FilterProvider");
    }
    return context;
};
