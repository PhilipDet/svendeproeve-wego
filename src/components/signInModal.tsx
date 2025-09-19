"use client";

import { useState } from "react";
import { SignupForm } from "./signupForm";
import { LoginForm } from "./loginForm";
import { AnimatePresence, motion } from "framer-motion";

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
            <AnimatePresence>
                {isOpen && (
                    <motion.main
                        className="max-md:hidden z-50 fixed inset-0 bg-black/50 flex items-center justify-center"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                setIsOpen(false);
                            }
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <SignInModalForm
                            isSigningUp={isSigningUp}
                            setIsSigningUp={setIsSigningUp}
                            setIsOpen={setIsOpen}
                            className="py-8 px-20"
                        />
                    </motion.main>
                )}
            </AnimatePresence>
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
        <motion.section
            className={`bg-white rounded-2xl flex flex-col gap-3 max-w-[400px] w-full ${className}`}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            transition={{ duration: 0.2 }}
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
        </motion.section>
    );
};
