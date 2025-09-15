"use client";

import { useForm } from "react-hook-form";
import { validation } from "@/lib/validation";
import { InputField } from "@/components/inputField";
import { handleFormError } from "@/lib/error";
import { useAuth } from "@/context/authContext";
import { SignupType } from "@/lib/types";
import { toast } from "react-toastify";

export const SignupForm = ({
    setIsSigningUp,
    setIsOpen,
}: {
    setIsSigningUp: (isSigningUp: boolean) => void;
    setIsOpen: (isOpen: boolean) => void;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupType>();
    const { signup } = useAuth();

    return (
        <>
            <form
                onSubmit={handleSubmit(async (data) => {
                    const result = await signup(data);
                    if (result.status === 200) {
                        toast.success("Din konto er blevet oprettet!");
                        reset();
                    } else {
                        toast.error(result.message);
                    }
                    setIsOpen(false);
                })}
                className="flex-1 flex flex-col gap-4 justify-center"
            >
                <InputField
                    label="Fornavn"
                    registration={register("firstName", {
                        validate: validation.firstName,
                    })}
                    error={
                        handleFormError(errors.firstName)
                            ? errors.firstName
                            : undefined
                    }
                />
                <InputField
                    label="Efternavn"
                    registration={register("lastName", {
                        validate: validation.lastName,
                    })}
                    error={
                        handleFormError(errors.lastName)
                            ? errors.lastName
                            : undefined
                    }
                />
                <InputField
                    label="Email"
                    type="email"
                    registration={register("email", {
                        validate: validation.email,
                    })}
                    error={
                        handleFormError(errors.email) ? errors.email : undefined
                    }
                />
                <InputField
                    label="Adgangskode"
                    type="password"
                    registration={register("password", {
                        validate: validation.password,
                    })}
                    error={
                        handleFormError(errors.password)
                            ? errors.password
                            : undefined
                    }
                />
                <button type="submit" className="btn">
                    Opret
                </button>
            </form>
            <button className="link" onClick={() => setIsSigningUp(false)}>
                Gå til Login
            </button>
        </>
    );
};
