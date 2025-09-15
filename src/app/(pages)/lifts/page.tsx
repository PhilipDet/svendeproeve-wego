"use client";

import { Container } from "@/components/container";
import { useTrips } from "@/hooks/useTrips";
import { useEffect } from "react";
import Image from "next/image";
import { StarRating } from "@/components/starRating";
import { tripFormattedDate } from "@/lib/utils";
import { MapPin, Target } from "lucide-react";
import { Seats } from "@/components/seats";
import Link from "next/link";

const LiftsPage = () => {
    const { trips, loading } = useTrips();

    return (
        <Container>
            {loading ? (
                <div>Henter ture...</div>
            ) : (
                trips.map((trip) => (
                    <Link
                        key={trip.id}
                        href={`/lifts/${trip.id}`}
                        className="w-full"
                    >
                        <article className="h-full flex bg-white rounded-2xl drop-shadow hover:bg-muted-background transition-colors duration-200 cursor-pointer">
                            <div className="max-w-[149px] w-full flex flex-col justify-between items-center p-4 border-r border-gray-300">
                                <Image
                                    src={trip.user.imageUrl}
                                    alt={`Billede af ${trip.user.firstname}`}
                                    width={66}
                                    height={66}
                                    className="rounded-full"
                                />
                                <span>{trip.user.firstname}</span>
                                <StarRating rating={trip.reviewsReceived} />
                            </div>

                            <div className="w-full p-4 flex flex-col gap-2.5">
                                <ul className="flex justify-between items-center">
                                    <li className="font-extrabold">
                                        {tripFormattedDate(trip.departureDate)}
                                    </li>
                                    <ul className="flex gap-2.5 items-center">
                                        {trip.useFerry && (
                                            <li>
                                                <Image
                                                    src="/images/icons/ferry.svg"
                                                    alt="Færge"
                                                    width={16}
                                                    height={16}
                                                />
                                            </li>
                                        )}
                                        {trip.isElectric && (
                                            <li>
                                                <Image
                                                    src="/images/icons/lightning.svg"
                                                    alt="Elbil"
                                                    width={16}
                                                    height={16}
                                                />
                                            </li>
                                        )}
                                    </ul>
                                </ul>
                                <div className="flex gap-2">
                                    <Target
                                        size={18}
                                        className="text-light-blue"
                                    />
                                    <div>
                                        <p className="text-sm font-extrabold">
                                            {trip.cityDeparture}
                                        </p>
                                        <p className="text-sm break-words">
                                            {trip.addressDeparture}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <MapPin
                                        size={18}
                                        className="text-light-blue"
                                    />
                                    <div>
                                        <p className="text-sm font-extrabold">
                                            {trip.cityDestination}
                                        </p>
                                        <p className="text-sm break-words">
                                            {trip.addressDestination}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-full max-w-[110px] grid grid-rows-2 w-full border-l border-gray-300">
                                <div className="p-4 flex justify-center items-center">
                                    <span className="font-extrabold">
                                        DKK {trip.pricePerSeat}
                                    </span>
                                </div>

                                <ul className="flex-1 flex justify-center items-center gap-1.5 p-4 border-t border-gray-300">
                                    <Seats
                                        totalSeats={trip.seatsTotal}
                                        bookedSeats={trip.bookings}
                                    />
                                </ul>
                            </div>
                        </article>
                    </Link>
                ))
            )}
        </Container>
    );
};

export default LiftsPage;
