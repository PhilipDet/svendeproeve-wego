"use client";

import { useForm } from "react-hook-form";
import { validation } from "@/lib/validation";
import { InputField } from "@/components/inputField";
import { handleFormError } from "@/lib/error";
import { useAuth } from "@/context/authContext";
import { LoginType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Container } from "@/components/container";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginType>();
    const { login } = useAuth();
    const router = useRouter();

    return (
        <Container>
            <form
                onSubmit={handleSubmit(async (data) => {
                    const result = await login(data);
                    if (result.status === 200) {
                        toast.success("Du er logget ind!");
                        reset();
                        router.push("/dashboard");
                    } else {
                        toast.error(result.message);
                    }
                })}
                className="flex-1 flex flex-col gap-4 max-w-sm w-full"
            >
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
                    registration={register("password")}
                />
                <button type="submit" className="btn place-self-end">
                    Login
                </button>
            </form>
        </Container>
    );
};

export default LoginPage;
