"use client";

import { FilterContextType } from "@/lib/types";
import { createContext, useContext, useState } from "react";

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [locationFrom, setLocationFrom] = useState<string | null>(null);
    const [locationTo, setLocationTo] = useState<string | null>(null);
    const [seats, setSeats] = useState<number | null>(null);
    const [luggageSize, setLuggageSize] = useState<string | null>(null);
    const [comfort, setComfort] = useState<boolean>(false);

    const [music, setMusic] = useState<boolean>(false);
    const [animals, setAnimals] = useState<boolean>(false);
    const [kids, setKids] = useState<boolean>(false);
    const [smoking, setSmoking] = useState<boolean>(false);

    return (
        <FilterContext.Provider
            value={{
                locationFrom,
                setLocationFrom,
                locationTo,
                setLocationTo,
                seats,
                setSeats,
                luggageSize,
                setLuggageSize,
                comfort,
                setComfort,
                music,
                setMusic,
                animals,
                setAnimals,
                kids,
                setKids,
                smoking,
                setSmoking,
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
