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
                    className="fixed inset-0 bg-black/50 flex items-center justify-center"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsOpen(false);
                        }
                    }}
                >
                    <section className="bg-white p-4 rounded-2xl flex flex-col gap-3 max-w-[400px] w-full py-8 px-20">
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
                </main>
            )}
        </>
    );
};
