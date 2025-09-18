"use client";

import { useState } from "react";
import { SignupForm } from "./signupForm";
import { LoginForm } from "./loginForm";

export const SigninModal = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const [isSigningUp, setIsSigningUp] = useState(false);

    return (
        <>
            {isOpen && (
                <main
                    className="z-50 fixed inset-0 bg-black/50 flex items-center justify-center"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsOpen(false);
                        }
                    }}
                >
                    <SignInModalForm
                        isSigningUp={isSigningUp}
                        setIsSigningUp={setIsSigningUp}
                        setIsOpen={setIsOpen}
                        className="py-8 px-20"
                    />
                </main>
            )}
        </>
    );
};

export const SignInModalForm = ({
    isSigningUp,
    setIsSigningUp,
    setIsOpen,
    className,
}: {
    isSigningUp: boolean;
    setIsSigningUp: (isSigningUp: boolean) => void;
    setIsOpen?: (isOpen: boolean) => void | undefined;
    className?: string;
}) => {
    return (
        <section
            className={`bg-white rounded-2xl flex flex-col gap-3 max-w-[400px] w-full ${className}`}
        >
            <h2 className="text-xl text-center font-extrabold">
                {isSigningUp ? "Opret konto" : "Log ind"}
            </h2>
            {isSigningUp ? (
                <SignupForm
                    setIsSigningUp={setIsSigningUp}
                    setIsOpen={setIsOpen}
                />
            ) : (
                <LoginForm
                    setIsSigningUp={setIsSigningUp}
                    setIsOpen={setIsOpen}
                />
            )}
        </section>
    );
};
