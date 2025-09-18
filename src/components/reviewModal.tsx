"use client";

import { useForm } from "react-hook-form";
import { validation } from "@/lib/validation";
import { InputField } from "@/components/inputField";
import { handleFormError } from "@/lib/error";
import { ReviewFormType, ReviewsReceived } from "@/lib/types";
import { toast } from "react-toastify";
import { createReview } from "@/services/reviews";
import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

    const [rating, setRating] = useState(5);

    return (
        <>
            {isOpen && userId && (
                <main
                    className="z-50 fixed inset-0 bg-black/50 flex items-center justify-center p-4"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsOpen(false);
                        }
                    }}
                >
                    <section className="bg-white rounded-2xl flex flex-col gap-3 max-w-[400px] w-full p-4 sm:py-8 sm:px-20">
                        <h2 className="text-xl text-center font-extrabold">
                            Skriv en anmeldelse
                        </h2>

                        <form
                            onSubmit={handleSubmit(async (data) => {
                                data.reviewerId = userId;
                                data.reviewedUserId = driverId;
                                data.numStars = rating;

                                const response = await createReview(data);
                                if (response.status === 200) {
                                    toast.success(response.message);
                                    reset();
                                    if (response.data) {
                                        onCreateReview(response.data);
                                    }
                                    setIsOpen(false);
                                } else {
                                    toast.error(response.message);
                                }
                            })}
                            className="flex-1 flex flex-col gap-4 max-w-sm w-full"
                        >
                            <section>
                                <label className="text-sm flex flex-col gap-1">
                                    Antal stjerner
                                    <div className="flex justify-between">
                                        {Array.from(
                                            { length: 5 },
                                            (_, i) => i + 1
                                        ).map((num) => (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => {
                                                    setRating(num);
                                                }}
                                            >
                                                <Star
                                                    size={30}
                                                    className={cn(
                                                        rating >= num
                                                            ? "fill-yellow-500"
                                                            : "fill-gray-300",
                                                        "stroke-none"
                                                    )}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </label>
                            </section>

                            <InputField
                                label="Anmeldelse"
                                type="textarea"
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
