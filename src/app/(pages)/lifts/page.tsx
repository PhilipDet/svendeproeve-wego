"use client";

import { Container } from "@/components/container";
import { useTrips } from "@/hooks/useTrips";
import Image from "next/image";
import { StarRating } from "@/components/starRating";
import { tripFormattedDate } from "@/lib/utils";
import { Seats } from "@/components/seats";
import Link from "next/link";
import { Filter } from "@/components/filter";
import { useFilter } from "@/context/filterContext";
import { useMemo } from "react";
import { LiftsWhere } from "@/components/liftsWhere";
import {
    ArrowRightCircleIcon,
    ChevronRightIcon,
    LucideTimer,
} from "lucide-react";

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
                            <article className="max-md:p-4 h-full grid max-md:gap-2 md:flex md:flex-row items-center md:items-stretch bg-white rounded-2xl drop-shadow hover:bg-muted-background transition-colors duration-200 cursor-pointer">
                                <div className="md:max-w-[149px] w-full max-md:row-start-3 flex md:flex-col md:justify-between items-center gap-2 md:p-4 md:border-r border-gray-300">
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
                                    <div className="flex flex-col md:items-center gap-1">
                                        <span>{trip.user?.firstName}</span>
                                        <StarRating
                                            rating={trip.reviewsReceived ?? []}
                                            size={16}
                                        />
                                    </div>

                                    <button className="md:hidden ml-auto bg-light-blue rounded-full p-4">
                                        <ChevronRightIcon
                                            size={30}
                                            className="text-background"
                                        />
                                    </button>
                                </div>

                                <div className="w-full md:p-4 flex flex-col items-center md:items-stretch justify-between gap-2.5">
                                    <ul className="w-full flex justify-between items-center">
                                        <li className="font-light md:font-extrabold flex items-center gap-2">
                                            <LucideTimer
                                                size={24}
                                                className="md:hidden text-gray-500"
                                            />
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
                                    <div className="w-full flex flex-col gap-1">
                                        <LiftsWhere
                                            icon="Target"
                                            city={trip.cityDeparture}
                                            address={trip.addressDeparture}
                                        />
                                        <LiftsWhere
                                            icon="MapPin"
                                            city={trip.cityDestination}
                                            address={trip.addressDestination}
                                        />
                                    </div>
                                </div>

                                <div className="md:max-w-[120px] w-full flex max-md:justify-between md:grid md:grid-rows-2 md:border-l max-md:py-2 max-md:px-4 max-md:border-2 max-md:rounded-full border-gray-300">
                                    <div className="flex justify-center items-center">
                                        <span className="font-extrabold">
                                            DKK {trip.pricePerSeat}
                                        </span>
                                    </div>

                                    <ul className="flex-1 flex justify-end md:justify-center items-center gap-1.5 md:border-t md:border-gray-300">
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
