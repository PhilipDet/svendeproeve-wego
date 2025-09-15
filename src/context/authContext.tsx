"use client";

import { SignupType, LoginType, UserType, AuthContextType } from "@/lib/types";
import { handleError } from "@/lib/error";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUser = async () => {
        setLoading(true);

        const Token = sessionStorage.getItem("accessToken");

        if (!Token) {
            setLoading(false);
            return;
        }

        try {
            const result = await fetch("/api/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Token}`,
                },
            });

            const res = await result.json();

            if (!result.ok && !res.authenticated) {
                throw new Error(res.message || "Hentning af bruger fejlede");
            }

            setUser(res);
        } catch (error) {
            console.error(handleError(error));
        } finally {
            setLoading(false);
        }
    };

    const login = async (data: LoginType) => {
        try {
            const result = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    credentials: "include",
                },
                body: JSON.stringify(data),
            });

            const res = await result.json();

            if (!result.ok) {
                throw new Error(res.message || "Login fejlede");
            }

            if (!res.accessToken) {
                throw new Error("Ingen access token modtaget");
            }

            sessionStorage.setItem("accessToken", res.accessToken);

            await fetchUser();

            return { message: "Logger ind..", status: 200 };
        } catch (error) {
            return { message: handleError(error), status: 400 };
        }
    };

    const signup = async (data: SignupType) => {
        try {
            const result = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    credentials: "include",
                },
                body: JSON.stringify(data),
            });

            const res = await result.json();

            if (!result.ok) {
                throw new Error(res.message || "Signup fejlede");
            }

            if (!res.accessToken) {
                throw new Error("Ingen access token modtaget");
            }

            sessionStorage.setItem("accessToken", res.accessToken);

            await fetchUser();

            return { message: "Bruger oprettet", status: 200 };
        } catch (error) {
            return { message: handleError(error), status: 400 };
        }
    };

    const logout = async () => {
        try {
            const res = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    credentials: "include",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to logout");
            }

            sessionStorage.removeItem("accessToken");

            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loadingUser: loading,
                login,
                signup,
                logout,
                fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};
