"use client";

import { usePathname } from "next/navigation";

export const Footer = () => {
    const pathName = usePathname();
    return (
        <>
            <footer
                className="relative w-full text-light-blue px-10 py-5"
                style={{
                    backgroundImage: "url(/images/footer.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "150px", // ændrer du nemt højden her
                }}
            >
                <ul className="flex flex-col justify-end items-start h-full">
                    <li className="text-lg font-normal">
                        &copy; {new Date().getFullYear()} WeGo ApS
                    </li>
                    <li className="text-xs font-light">
                        Fartstræde 12c, 2. sal, 9000 Aalborg
                    </li>
                </ul>
            </footer>
            {pathName !== "/" && (
                <div className="h-30 w-full bg-dark-blue"></div>
            )}
        </>
    );
};
