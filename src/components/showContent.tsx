"use client";

import { usePathname } from "next/navigation";
import { SearchNavigation } from "./searchNavigation";

export const ShowContent = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
    if (pathName === "/lifts")
        return (
            <>
                <SearchNavigation />
                {children}
            </>
        );
    return <>{children}</>;
};
