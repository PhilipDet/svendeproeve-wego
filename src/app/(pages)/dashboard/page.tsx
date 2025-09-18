"use client";

import { Container } from "@/components/container";
import { LiftsWhere } from "@/components/liftsWhere";
import { useAuth } from "@/context/authContext";
import { useBookingsByUserId } from "@/hooks/useBookings";
import Image from "next/image";
import { LiftPreferences } from "@/components/liftPreferences";
import { formatDate } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { BookingType } from "@/lib/types";
import { deleteBooking } from "@/services/bookings";
import { toast } from "react-toastify";

const DashboardPage = () => {
    const { user, loadingUser, logout } = useAuth();
    const { bookings, loadingBookings } = useBookingsByUserId(user?.id || null);

    const [sortedBookings, setSortedBookings] = useState<BookingType[]>([]);

    useEffect(() => {
        if (!loadingBookings && bookings) {
            setSortedBookings(
                bookings.sort((a, b) => {
                    const dateA = a.createdAt ? a.createdAt.getTime() : 0;
                    const dateB = b.createdAt ? b.createdAt.getTime() : 0;
                    return dateB - dateA;
                })
            );
        }
    }, [bookings, loadingBookings]);

    return (
        <Container>
            {loadingUser ? (
                <span>Henter Bruger...</span>
            ) : (
                user && (
                    <>
                        <h1 className="text-2xl font-extrabold">
                            Velkommen, {user.firstName} {user.lastName}
                        </h1>
                    </>
                )
            )}

            {!loadingBookings && bookings && sortedBookings.length === 0 ? (
                <p>Du har ingen bookinger endnu.</p>
            ) : (
                sortedBookings.map((booking, index) => (
                    <article
                        key={index}
                        className="max-w-3xl w-full rounded-2xl bg-background grid grid-cols-1 md:grid-cols-2 gap-6 p-4"
                    >
                        <ul className="flex justify-between col-span-2">
                            <li className="flex items-center gap-2">
                                <Clock size={20} className="text-gray-400" />
                                {formatDate(
                                    booking.trip?.departureDate.toISOString() ||
                                        "Ugyldig Dato"
                                )}
                            </li>

                            <li>
                                <strong>{booking.numSeats}</strong> sæde
                                {booking.numSeats &&
                                    booking.numSeats > 1 &&
                                    "r"}{" "}
                                booket
                            </li>
                        </ul>

                        <div className="max-md:col-span-2 flex flex-col gap-2">
                            <LiftsWhere
                                icon="Target"
                                city={
                                    booking.trip?.cityDeparture || "Ukendt by"
                                }
                                address={
                                    booking.trip?.addressDeparture ||
                                    "Ukendt adresse"
                                }
                            />
                            <LiftsWhere
                                icon="MapPin"
                                city={
                                    booking.trip?.cityDestination || "Ukendt by"
                                }
                                address={
                                    booking.trip?.addressDestination ||
                                    "Ukendt adresse"
                                }
                            />
                        </div>

                        <ul className="sm:col-span-2 grid grid-cols-1 md:flex md:flex-col justify-center gap-2.5">
                            <ul className="flex items-center gap-2">
                                <li>
                                    <Image
                                        src="/images/icons/ferry.svg"
                                        alt="Færge ikon"
                                        width={20}
                                        height={20}
                                    />
                                </li>
                                <li className="text-sm font-medium">
                                    {booking.trip?.useFerry
                                        ? "Rute inkluderer en færge"
                                        : "Rute inkluderer IKKE en færge"}
                                </li>
                            </ul>
                            <ul className="flex items-center gap-2">
                                <li>
                                    <Image
                                        src="/images/icons/lightning.svg"
                                        alt="Lyn ikon"
                                        width={20}
                                        height={20}
                                    />
                                </li>
                                <li className="text-sm font-medium">
                                    {booking.trip?.isElectric
                                        ? "Køretøjet er elektrisk"
                                        : "Køretøjet er IKKE elektrisk"}
                                </li>
                            </ul>
                        </ul>

                        <div className="max-sm:col-span-2 grid grid-cols-2">
                            <LiftPreferences
                                label="Kæledyr"
                                allowed={booking.trip?.allowPets || false}
                            />
                            <LiftPreferences
                                label="Musik"
                                allowed={booking.trip?.allowMusic || false}
                            />
                            <LiftPreferences
                                label="Børn"
                                allowed={booking.trip?.allowChildren || false}
                            />
                            <LiftPreferences
                                label="Rygning"
                                allowed={booking.trip?.allowSmoking || false}
                            />
                        </div>

                        <div className="flex max-md:col-span-2 gap-2 items-center">
                            <Image
                                src={
                                    booking.trip?.user?.imageUrl ||
                                    "/user-placeholder.png"
                                }
                                alt="Chauffør billede"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <ul className="flex flex-col">
                                <li>Chauffør</li>
                                <li className="font-extrabold">
                                    {booking.trip?.user?.firstName}{" "}
                                    {booking.trip?.user?.lastName}
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={async () => {
                                const response = await deleteBooking(
                                    booking.id
                                );

                                if (response.status === 200) {
                                    setSortedBookings((prev: BookingType[]) =>
                                        prev.filter((book) => {
                                            book.id !== booking.id;
                                        })
                                    );

                                    toast.success(response.message);
                                } else {
                                    toast.error(response.message);
                                }
                            }}
                            className="btn col-span-2"
                        >
                            Fortryd booking
                        </button>
                    </article>
                ))
            )}
        </Container>
    );
};

export default DashboardPage;
