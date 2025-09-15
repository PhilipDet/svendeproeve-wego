"use client";

import { AuthProvider } from "@/context/authContext";
import { FilterProvider } from "@/context/filterContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <FilterProvider>{children}</FilterProvider>
        </AuthProvider>
    );
};
