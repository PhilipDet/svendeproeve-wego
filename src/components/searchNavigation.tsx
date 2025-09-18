"use client";

import { ArrowLeftRight } from "lucide-react";
import { useFilter } from "@/context/filterContext";
import { SearchInput } from "./searchInput";
import { usePathname, useRouter } from "next/navigation";

export const SearchNavigation = () => {
    const { setLocationFrom, setLocationTo } = useFilter();

    const pathName = usePathname();
    const router = useRouter();

    return (
        <main className="z-30 w-full bg-white border-y-1 border-gray-300 drop-shadow flex justify-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (pathName !== "/lifts") router.push("/lifts");
                }}
                className="max-w-3xl w-full flex justify-center gap-3 m-3"
            >
                <SearchInput
                    isLocationFrom={true}
                    changeSelectCity={setLocationFrom}
                />

                <button
                    type="button"
                    onClick={() => {}}
                    className="max-w-[47.2px] w-full flex items-center justify-center bg-light-blue/20 text-light-blue rounded-xl"
                >
                    <ArrowLeftRight size={16} />
                </button>

                <SearchInput
                    isLocationFrom={false}
                    changeSelectCity={setLocationTo}
                />
            </form>
        </main>
    );
};
