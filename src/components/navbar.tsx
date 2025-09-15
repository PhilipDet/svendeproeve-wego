"use client";

import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useState } from "react";
import { SigninModal } from "./signInModal";
import Link from "next/link";
import { GuideModal } from "./guideModal";

export const Navbar = () => {
    const { user, logout, loadingUser } = useAuth();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    return (
        <>
            <nav className="w-full bg-background text-foreground text-xl py-5 px-10 items-center">
                <ul className="flex gap-7 items-end">
                    <li>
                        <Link href="/">
                            <Image
                                src="/images/icons/logo.svg"
                                alt="Logo"
                                width={100}
                                height={100}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/lifts">Find et Lift</Link>
                    </li>
                    <li>
                        <button onClick={() => setIsGuideOpen(true)}>
                            Sådan virker det
                        </button>
                    </li>
                    {!loadingUser && user && (
                        <li>
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
