"use client";

import { Container } from "@/components/container";
import { useTrips } from "@/hooks/useTrips";
import Image from "next/image";
import { StarRating } from "@/components/starRating";
import { tripFormattedDate } from "@/lib/utils";
import { MapPin, Target } from "lucide-react";
import { Seats } from "@/components/seats";
import Link from "next/link";
import { Filter } from "@/components/filter";
import { useFilter } from "@/context/filterContext";
import { useMemo } from "react";

const LiftsPage = () => {
    const { trips, loading } = useTrips();
    const {
        locationFrom,
        locationTo,
        seats,
        luggageSize,
        comfort,
        music,
        animals,
        kids,
        smoking,
        resetFilter,
    } = useFilter();

    const filteredTrips = useMemo(() => {
        return trips.filter((trip) => {
            const bookedSeats = trip.bookings ? trip.bookings.length : 0;
            const availableSeats = trip.seatsTotal - bookedSeats;

            const conditions = [
                seats === null || availableSeats >= seats,
                luggageSize === null || trip.bagSizeId === luggageSize,
                !locationFrom ||
                    trip.cityDeparture
                        .toLowerCase()
                        .includes(locationFrom.toLowerCase()),
                !locationTo ||
                    trip.cityDestination
                        .toLowerCase()
                        .includes(locationTo.toLowerCase()),
                !comfort || trip.hasComfort,
                !music || trip.allowMusic,
                !animals || trip.allowPets,
                !kids || trip.allowChildren,
                !smoking || trip.allowSmoking,
            ];

            return conditions.every(Boolean);
        });
    }, [
        trips,
        seats,
        luggageSize,
        locationFrom,
        locationTo,
        comfort,
        music,
        animals,
        kids,
        smoking,
    ]);

    return (
        <Container className="flex-row items-start">
            <Filter />

            <section className="w-full flex flex-col gap-4">
                {loading ? (
                    <div>Henter ture...</div>
                ) : filteredTrips.length <= 0 ? (
                    <div className="h-full flex flex-col gap-2 bg-white rounded-2xl drop-shadow hover:bg-muted-background transition-colors duration-200 p-4">
                        Der bliver ikke fundet nogen ture der matcher din
                        søgning...
                        <button
                            className="btn place-self-start"
                            onClick={resetFilter}
                        >
                            Nulstil Søgning
                        </button>
                    </div>
                ) : (
                    filteredTrips.map((trip) => (
                        <Link
                            key={trip.id}
                            href={`/lifts/${trip.id}`}
                            className="w-full"
                        >
                            <article className="h-full flex bg-white rounded-2xl drop-shadow hover:bg-muted-background transition-colors duration-200 cursor-pointer">
                                <div className="max-w-[149px] w-full flex flex-col justify-between items-center p-4 border-r border-gray-300">
                                    <Image
                                        src={
                                            trip.user?.imageUrl ||
                                            "/images/user-placeholder.png"
                                        }
                                        alt={`Billede af ${trip.user?.firstName}`}
                                        width={66}
                                        height={66}
                                        className="rounded-full"
                                    />
                                    <span>{trip.user?.firstName}</span>
                                    <StarRating
                                        rating={trip.reviewsReceived ?? []}
                                        size={16}
                                    />
                                </div>

                                <div className="w-full p-4 flex flex-col justify-between gap-2.5">
                                    <ul className="flex justify-between items-center">
                                        <li className="font-extrabold">
                                            {tripFormattedDate(
                                                trip.departureDate.toISOString() ??
                                                    undefined
                                            )}
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

                                <div className="grid grid-rows-2 max-w-[120px] w-full border-l border-gray-300">
                                    <div className="flex justify-center items-center">
                                        <span className="font-extrabold">
                                            DKK {trip.pricePerSeat}
                                        </span>
                                    </div>

                                    <ul className="flex-1 flex justify-center items-center gap-1.5 border-t border-gray-300">
                                        <Seats
                                            totalSeats={trip.seatsTotal}
                                            bookedSeats={trip.bookings ?? []}
                                        />
                                    </ul>
                                </div>
                            </article>
                        </Link>
                    ))
                )}
            </section>
        </Container>
    );
};

export default LiftsPage;
