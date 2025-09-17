"use client";

import { useForm } from "react-hook-form";
import { validation } from "@/lib/validation";
import { InputField } from "@/components/inputField";
import { handleFormError } from "@/lib/error";
import { ReviewFormType, ReviewsReceived } from "@/lib/types";
import { toast } from "react-toastify";
import { createReview } from "@/services/reviews";

export const ReviewModal = ({
    isOpen,
    setIsOpen,
    userId,
    driverId,
    onCreateReview,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    userId: number;
    driverId: number;
    onCreateReview: (newReview: ReviewsReceived) => void;
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReviewFormType>();

    return (
        <>
            {isOpen && userId && (
                <main
                    className="z-50 fixed inset-0 bg-black/50 flex items-center justify-center"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsOpen(false);
                        }
                    }}
                >
                    <section className="bg-white p-4 rounded-2xl flex flex-col gap-3 max-w-[400px] w-full py-8 px-20">
                        <h2 className="text-xl text-center font-extrabold">
                            Skriv en anmeldelse
                        </h2>

                        <form
                            onSubmit={handleSubmit(async (data) => {
                                data.reviewerId = userId;
                                data.reviewedUserId = driverId;
                                data.numStars = Number(data.numStars);

                                const result = await createReview(data);
                                if (result.status === 200) {
                                    toast.success("Tak for din anmeldelse!");
                                    reset();
                                    if (result.data) {
                                        onCreateReview(result.data);
                                    }
                                    setIsOpen(false);
                                } else {
                                    toast.error(result.message);
                                }
                            })}
                            className="flex-1 flex flex-col gap-4 max-w-sm w-full"
                        >
                            <select
                                id="numStars"
                                {...register("numStars")}
                                className="input"
                            >
                                {Array.from({ length: 5 }, (_, i) => i + 1).map(
                                    (num) => (
                                        <option key={num} value={num}>
                                            {num} Stjerner
                                        </option>
                                    )
                                )}
                            </select>

                            <InputField
                                label="Anmeldelse"
                                type="text"
                                registration={register("comment", {
                                    validate: validation.comment,
                                })}
                                error={
                                    handleFormError(errors.comment)
                                        ? errors.comment
                                        : undefined
                                }
                            />
                            <button type="submit" className="btn">
                                Send anmeldelse
                            </button>
                        </form>
                    </section>
                </main>
            )}
        </>
    );
};
