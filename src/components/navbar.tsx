"use client";

import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useState } from "react";
import { SigninModal } from "./signInModal";
import Link from "next/link";
import { GuideModal } from "./guideModal";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { NavigationModal } from "./navigationModal";
import { toast } from "react-toastify";

export const Navbar = () => {
    const pathName = usePathname();
    const { user, logout, loadingUser } = useAuth();
    const [isNavOpen, setIsNavOpen] = useState(false);
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
                            "max-md:hidden",
                            "relative pb-5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-light-blue hover:after:w-full after:transition-all after:duration-300",
                            isActive("/lifts") ? "after:w-full" : "after:w-0"
                        )}
                    >
                        <Link href="/lifts">Find et Lift</Link>
                    </li>

                    <li className="max-md:hidden relative pb-5 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-light-blue after:w-0 after:transition-all after:duration-300 hover:after:w-full">
                        <button onClick={() => setIsGuideOpen(true)}>
                            Sådan virker det
                        </button>
                    </li>

                    {!loadingUser && user && (
                        <li
                            className={cn(
                                "max-md:hidden",
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
                                    <li className="md:hidden pb-5">
                                        <Image
                                            src={
                                                user.imageUrl ||
                                                "/images/user-placeholder.png"
                                            }
                                            alt={`Dit Profil Billede`}
                                            width={40}
                                            height={40}
                                            className="rounded-full h-10 w-10 object-cover"
                                        />
                                    </li>

                                    <li className="max-md:hidden pb-5">
                                        <span className="text-sm">
                                            {user.firstName} {user.lastName}
                                        </span>
                                    </li>
                                    <li className="max-md:hidden pb-5">
                                        <button
                                            onClick={() => {
                                                logout();
                                                toast.success(
                                                    "Du er nu logget ud!"
                                                );
                                            }}
                                            className="btn-secondary"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className="max-md:hidden pb-5">
                                    <button
                                        onClick={() => setIsLoginOpen(true)}
                                        className="btn-secondary"
                                    >
                                        Login
                                    </button>
                                </li>
                            ))}
                    </ul>
                    <li className="md:hidden pb-5">
                        <button onClick={() => setIsNavOpen(true)}>
                            <Menu size={30} />
                        </button>
                    </li>
                </ul>
            </nav>

            <NavigationModal isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
            <SigninModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
            <GuideModal isOpen={isGuideOpen} setIsOpen={setIsGuideOpen} />
        </>
    );
};
