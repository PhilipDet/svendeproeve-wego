"use client";

import Link from "next/link";
import { useAuth } from "@/context/authContext";

export const Navbar = () => {
    const { user, logout, loadingUser } = useAuth();

    return (
        <nav className="w-full bg-muted-background text-foreground text-xl py-2 px-4 items-center border-b border-gray-300">
            <ul className="flex gap-4">
                <li className="mr-auto">Logo</li>
                {!loadingUser &&
                    (user ? (
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    ) : (
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                    ))}
            </ul>
        </nav>
    );
};
