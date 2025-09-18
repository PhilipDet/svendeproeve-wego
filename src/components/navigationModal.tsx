import { Home, Search, User, X } from "lucide-react";
import Link from "next/link";
import { Container } from "./container";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { SignInModalForm } from "./signInModal";
import { toast } from "react-toastify";

export const NavigationModal = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const { user, loadingUser, logout } = useAuth();
    const [isSigningUp, setIsSigningUp] = useState(false);

    return (
        isOpen && (
            <Container className="md:hidden fixed inset-0 w-full h-dvh bg-background text-xl z-40 pt-18 px-11">
                <button
                    className="absolute top-8 right-8 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={40} />
                </button>
                <ul className="w-full flex flex-col gap-4">
                    <ul>
                        <li>
                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)}
                                className="w-full flex items-center gap-2 py-4"
                            >
                                <Home size={30} />
                                Forside
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/lifts"
                                onClick={() => setIsOpen(false)}
                                className="w-full flex items-center gap-2 py-4"
                            >
                                <Search size={30} />
                                Find et lift
                            </Link>
                        </li>
                        {!loadingUser && user && (
                            <li>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center gap-2 py-4"
                                >
                                    <User size={30} />
                                    Min side
                                </Link>
                            </li>
                        )}
                    </ul>
                    <li>
                        {!loadingUser && user ? (
                            <form
                                className="flex flex-col gap-5"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    logout();
                                    toast.success("Du er nu logget ud!");
                                }}
                            >
                                <h2 className="text-xl text-center font-extrabold">
                                    Konto
                                </h2>
                                <input
                                    type="text"
                                    value={`${user.firstName} ${user.lastName}`}
                                    disabled
                                    className="input w-full"
                                />
                                <button className="btn" type="submit">
                                    Logout
                                </button>
                            </form>
                        ) : (
                            <SignInModalForm
                                isSigningUp={isSigningUp}
                                setIsSigningUp={setIsSigningUp}
                                className="bg-none max-w-full sm:py-8 sm:px-20"
                            />
                        )}
                    </li>
                </ul>
            </Container>
        )
    );
};
