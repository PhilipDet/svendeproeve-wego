"use client";

import { use, useEffect, useState } from "react";
import { Container } from "@/components/container";
import { InputField } from "@/components/inputField";
import { validation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { handleFormError } from "@/lib/error";
import { BookingFormType } from "@/lib/types";
import { formatCardNumber, formatExpiryDate } from "@/lib/formFormatting";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import { createBooking } from "@/services/bookings";
import Link from "next/link";
import { useTrip } from "@/hooks/useTrips";
import { useBookingsByTripId } from "@/hooks/useBookings";
import { MoveRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

const BookingPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { user } = useAuth();
    const { trip } = useTrip(Number(id));
    const { bookings, loadingBookings } = useBookingsByTripId(Number(id));
    const router = useRouter();

    const [selectedSeats, setSelectedSeats] = useState(1);
    const [totalPrice, setTotalPrice] = useState(trip?.pricePerSeat || 0);

    useEffect(() => {
        setTotalPrice((trip?.pricePerSeat || 0) * selectedSeats);
    }, [selectedSeats, trip]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookingFormType>();

    return (
        <Container className="grid grid-cols-5 items-start gap-16">
            {id && user && (
                <>
                    <section className="w-full col-span-3">
                        <h1 className="text-xl font-extrabold">Book et lift</h1>

                        <form
                            onSubmit={handleSubmit(async (data) => {
                                data.userId = user?.id;
                                data.tripId = Number(id);
                                data.numSeats = selectedSeats;

                                const response = await createBooking(data);
                                if (response.status === 200) {
                                    toast.success(response.message);
                                    reset();
                                    router.push(`/lifts/${id}`);
                                } else {
                                    toast.error(response.message);
                                }
                            })}
                            className="flex flex-col gap-4"
                        >
                            <select
                                name="seats"
                                id="seats"
                                className="input w-full"
                                onChange={(e) =>
                                    setSelectedSeats(Number(e.target.value))
                                }
                                value={selectedSeats}
                            >
                                {loadingBookings ? (
                                    <option>
                                        Henter antal ledige pladser...
                                    </option>
                                ) : (
                                    <>
                                        {Array.from(
                                            {
                                                length:
                                                    (trip?.seatsTotal ?? 0) -
                                                        bookings.length >
                                                    0
                                                        ? (trip?.seatsTotal ??
                                                              0) -
                                                          bookings.length
                                                        : 0,
                                            },
                                            (_, i) => i + 1
                                        ).map((num) => (
                                            <option key={num} value={num}>
                                                {num}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>

                            <InputField
                                label="Besked til chaufføren"
                                type="textarea"
                                registration={register("message")}
                                error={
                                    handleFormError(errors.message)
                                        ? errors.message
                                        : undefined
                                }
                            />
                            <InputField
                                label="Kortnummer"
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                registration={register("cardNumber", {
                                    validate: validation.cardNumber,
                                })}
                                format={formatCardNumber}
                                error={
                                    handleFormError(errors.cardNumber)
                                        ? errors.cardNumber
                                        : undefined
                                }
                            />

                            <InputField
                                label="Udløbsdato"
                                type="text"
                                placeholder="MM/ÅÅ"
                                registration={register("expiryDate", {
                                    validate: validation.expiryDate,
                                })}
                                format={formatExpiryDate}
                                error={
                                    handleFormError(errors.expiryDate)
                                        ? errors.expiryDate
                                        : undefined
                                }
                            />

                            <InputField
                                label="CVV-kode"
                                type="text"
                                placeholder="CVV"
                                registration={register("cvv", {
                                    validate: validation.cvv,
                                })}
                                error={
                                    handleFormError(errors.cvv)
                                        ? errors.cvv
                                        : undefined
                                }
                            />

                            <button type="submit" className="btn">
                                Book & Betal
                            </button>

                            <Link
                                href={`/lifts/${id}`}
                                className="text-center link"
                            >
                                Tilbage
                            </Link>
                        </form>
                    </section>

                    <article className="w-full col-span-2 bg-background rounded-lg">
                        <div className="py-2.5 px-4">
                            <span className="flex gap-2 text-lg font-extrabold">
                                {trip?.cityDeparture} <MoveRight />{" "}
                                {trip?.cityDestination}
                            </span>
                            <p>
                                {formatDate(
                                    trip?.departureDate.toISOString() ||
                                        "Ugyldig Dato"
                                )}
                            </p>
                            <p>{selectedSeats} sæde</p>
                        </div>

                        <hr className="border-1 border-gray-300" />

                        <ul className="flex justify-between py-2.5 px-4 text-sm font-extrabold">
                            <li>Samlet pris</li>
                            <li>{totalPrice}</li>
                        </ul>
                    </article>
                </>
            )}
        </Container>
    );
};

export default BookingPage;
