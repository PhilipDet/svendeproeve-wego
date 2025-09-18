"use client";

import { ArrowLeftRight } from "lucide-react";
import { useFilter } from "@/context/filterContext";
import { SearchInput } from "./searchInput";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const SearchNavigation = ({ className }: { className?: string }) => {
    const { setLocationFrom, setLocationTo, locationFrom, locationTo } =
        useFilter();

    const [holdLocationFrom, setHoldLocationFrom] = useState<string | null>(
        locationFrom || null
    );
    const [holdLocationTo, setHoldLocationTo] = useState<string | null>(
        locationTo || null
    );

    const pathName = usePathname();
    const router = useRouter();

    return (
        <main
            className={cn(
                "z-30 md:sticky md:top-0 w-full bg-white md:border-y-1 border-gray-300 md:drop-shadow flex max-md:flex-col justify-center max-md:gap-2.5 max-md:p-4 max-md:rounded-2xl",
                className
            )}
        >
            <h2 className="md:hidden text-xl font-extrabold">Find et lift</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    setLocationFrom(holdLocationFrom);
                    setLocationTo(holdLocationTo);

                    if (pathName !== "/lifts") router.push("/lifts");
                }}
                className="max-w-3xl w-full flex max-md:flex-col justify-center gap-3 md:m-3"
            >
                <SearchInput
                    isLocationFrom={true}
                    changeSelectCity={setHoldLocationFrom}
                    holdLocation={holdLocationFrom}
                />

                <button
                    type="button"
                    onClick={() => {
                        const temp = holdLocationFrom;
                        setHoldLocationFrom(holdLocationTo);
                        setHoldLocationTo(temp);
                    }}
                    className="max-w-[47.2px] w-full flex items-center justify-center bg-light-blue/20 text-light-blue rounded-xl max-md:hidden"
                >
                    <ArrowLeftRight size={16} />
                </button>

                <SearchInput
                    isLocationFrom={false}
                    changeSelectCity={setHoldLocationTo}
                    holdLocation={holdLocationTo}
                />

                <button type="submit" className="btn w-full">
                    Søg lift
                </button>
            </form>
        </main>
    );
};
