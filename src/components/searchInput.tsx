import { use, useEffect, useState } from "react";
import { MapPin, Target } from "lucide-react";
import { useCities } from "@/hooks/useCities";
import { useFilter } from "@/context/filterContext";

export const SearchInput = ({
    isLocationFrom = false,
    changeSelectCity,
    tempLocation,
}: {
    isLocationFrom?: boolean;
    changeSelectCity: (city: string) => void;
    tempLocation: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { citiesDeparture, citiesDestination, loading } = useCities();
    const { locationFrom, locationTo } = useFilter();

    const searchQuery = isLocationFrom ? locationFrom ?? "" : locationTo ?? "";

    let cities: string[] = [];
    if (!loading) {
        cities = isLocationFrom ? citiesDeparture : citiesDestination;
    }

    const filteredCities =
        cities
            ?.filter((city: string) =>
                city
                    .toLowerCase()
                    .includes(
                        tempLocation?.toLowerCase() || searchQuery.toLowerCase()
                    )
            )
            .reduce((acc: string[], city: string) => {
                if (!acc.includes(city)) acc.push(city);
                return acc;
            }, []) || [];

    useEffect(() => {
        if (tempLocation === "") {
            setIsOpen(false);
        }
    }, [tempLocation]);

    return (
        <label
            htmlFor={isLocationFrom ? "locationFrom" : "locationTo"}
            className="relative md:min-w-[300px] w-full flex items-center gap-2 py-2.5 px-2 bg-white rounded-xl border-2 border-gray-300 focus:border-light-blue cursor-text"
        >
            {isLocationFrom ? (
                <Target size={16} className="text-light-blue" />
            ) : (
                <MapPin size={16} className="text-light-blue" />
            )}
            <input
                type="text"
                placeholder={isLocationFrom ? "Hvor fra?" : "Hvor til?"}
                name={isLocationFrom ? "locationFrom" : "locationTo"}
                id={isLocationFrom ? "locationFrom" : "locationTo"}
                onChange={(e) => {
                    setIsOpen(true);
                    changeSelectCity(e.target.value);
                }}
                value={tempLocation}
                className="text-sm w-full"
            />

            {isOpen && filteredCities.length > 0 && (
                <ul className="z-40 max-w-[300px] w-full absolute top-full left-0 bg-white border-2 border-gray-300 max-h-60 overflow-y-scroll rounded-y-xl rounded-l-xl">
                    {filteredCities.map((city) => (
                        <li
                            key={city}
                            onClick={() => {
                                setIsOpen(false);
                                changeSelectCity(city);
                            }}
                            className="capitalize px-2 py-1 hover:bg-gray-100 cursor-pointer"
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            )}
        </label>
    );
};
