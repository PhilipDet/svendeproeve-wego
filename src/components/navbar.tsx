"use client";

import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useState } from "react";
import { SigninModal } from "./signInModal";
import Link from "next/link";
import { GuideModal } from "./guideModal";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const pathName = usePathname();
    const { user, logout, loadingUser } = useAuth();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    const isActive = (href: string) =>
        pathName === href || pathName.startsWith(href + "/");

    return (
        <>
            <nav className="relative w-full bg-background text-foreground text-xl pt-5 px-10 items-center">
                <ul className="flex gap-7 items-end">
                    <li className="pb-5">
                        <Link href="/">
                            <Image
                                src="/images/icons/logo.svg"
                                alt="Logo"
                                width={100}
                                height={100}
                            />
                        </Link>
                    </li>

                    <li
                        className={cn(
                            "relative pb-5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-light-blue hover:after:w-full after:transition-all after:duration-300",
                            isActive("/lifts") ? "after:w-full" : "after:w-0"
                        )}
                    >
                        <Link href="/lifts">Find et Lift</Link>
                    </li>

                    <li className="relative pb-5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-light-blue after:w-0 after:transition-all after:duration-300 hover:after:w-full">
                        <button onClick={() => setIsGuideOpen(true)}>
                            Sådan virker det
                        </button>
                    </li>

                    {!loadingUser && user && (
                        <li
                            className={cn(
                                "relative pb-5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-light-blue hover:after:w-full after:transition-all after:duration-300",
                                isActive("/dashboard")
                                    ? "after:w-full"
                                    : "after:w-0"
                            )}
                        >
                            <Link href="/dashboard">Min side</Link>
                        </li>
                    )}

                    <ul className="ml-auto flex gap-4 items-center">
                        {!loadingUser &&
                            (user ? (
                                <>
                                    <li>
                                        <span className="text-sm">
                                            {user.firstName} {user.lastName}
                                        </span>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="btn-secondary"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <button
                                        onClick={() => setIsLoginOpen(true)}
                                        className="btn-secondary"
                                    >
                                        Login
                                    </button>
                                </li>
                            ))}
                    </ul>
                </ul>
            </nav>

            <SigninModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
            <GuideModal isOpen={isGuideOpen} setIsOpen={setIsGuideOpen} />
        </>
    );
};
