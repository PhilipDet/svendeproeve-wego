"use client";

import { Container } from "@/components/container";
import { use } from "react";
import { useTrip } from "@/hooks/useTrips";
import { formatDate, formatDateShort } from "@/lib/utils";
import Image from "next/image";
import { StarRating } from "@/components/starRating";
import { ReviewsReceived } from "@/lib/types";

const DetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { trip, loading } = useTrip(Number(id));

    return (
        <Container>
            {loading ? (
                <p>Henter detaljer om turen...</p>
            ) : (
                trip && (
                    <section className="w-full flex flex-col gap-8 bg-background p-4 rounded-2xl">
                        <article className="flex flex-col gap-1">
                            <h1 className="font-extrabold text-xl">
                                {trip.cityDeparture} til {trip.cityDestination}
                            </h1>
                            <p className="text-sm font-light">
                                {trip.departureDate
                                    ? formatDate(
                                          trip.departureDate.toISOString()
                                      )
                                    : "Ugyldig dato"}
                            </p>
                        </article>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-lg font-extrabold">
                                Information
                            </h2>

                            {trip.useFerry && (
                                <ul>
                                    <li>
                                        <Image
                                            src="/images/icons/ferry.svg"
                                            alt="Færge ikon"
                                            width={20}
                                            height={20}
                                        />
                                    </li>
                                    <li className="text-sm font-medium">
                                        Rute inkluderer en færge
                                    </li>
                                </ul>
                            )}

                            <span className="text-sm font-medium">
                                Detaljer
                            </span>

                            <span className="text-sm font-medium">
                                Præferencer
                            </span>
                        </section>

                        <section>
                            <h4 className="text-lg font-extrabold">
                                Chaufførens kommentar:
                            </h4>

                            <div className="flex gap-2">
                                <Image
                                    src="/images/icons/comment.svg"
                                    alt="Kommentar ikon"
                                    width={45}
                                    height={45}
                                />
                                <p>
                                    {trip.comment ||
                                        `${trip.user?.firstName} har ikke tilføjet en kommentar`}
                                </p>
                            </div>
                        </section>

                        <section className="flex flex-col gap-5">
                            <h3 className="text-lg font-extrabold">
                                Chaufføren:
                            </h3>

                            <article className="flex gap-4">
                                <Image
                                    src={
                                        trip.user?.imageUrl ||
                                        "/images/placeholder.png"
                                    }
                                    alt="Chauffør billede"
                                    width={145}
                                    height={145}
                                    quality={80}
                                    className="rounded-full"
                                />
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-xl font-extrabold">
                                        {trip.user?.firstName}{" "}
                                        {trip.user?.lastName.slice(0, 1)}.
                                    </span>

                                    <ul className="flex gap-2.5 items-center">
                                        <li>
                                            <StarRating
                                                rating={
                                                    trip.user?.reviewsRecieved?.map(
                                                        (
                                                            review: ReviewsReceived
                                                        ) => review.numStars
                                                    ) || [0]
                                                }
                                                size={24}
                                            />
                                        </li>
                                        <li>
                                            (
                                            {trip.user?.reviewsRecieved
                                                ?.length || 0}{" "}
                                            anmeldelser )
                                        </li>
                                    </ul>

                                    <p className="text-xs font-light text-gray-400">
                                        {`Medlem siden ${
                                            trip.user?.createdAt
                                                ? formatDateShort(
                                                      trip.user.createdAt.toISOString()
                                                  )
                                                : "Ugyldig dato"
                                        }`}
                                    </p>

                                    <button className="btn">
                                        Skriv en anmeldelse
                                    </button>
                                </div>
                            </article>

                            <div className="flex flex-col gap-5">
                                {trip.user?.reviewsRecieved?.map(
                                    (review, index) => {
                                        return (
                                            review && (
                                                <article
                                                    key={index}
                                                    className="flex gap-4 bg-muted-background py-2 px-2.5 rounded-2xl"
                                                >
                                                    <div className="flex items-center">
                                                        <Image
                                                            src={
                                                                review.reviewer
                                                                    ?.imageUrl ||
                                                                "/images/placeholder.png"
                                                            }
                                                            alt="Billede af personen der har lagt en anmeldelse"
                                                            width={30}
                                                            height={30}
                                                            className="rounded-full aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-lg font-extrabold">
                                                            {
                                                                trip.user
                                                                    ?.firstName
                                                            }{" "}
                                                            {trip.user?.lastName.slice(
                                                                0,
                                                                1
                                                            )}
                                                            .
                                                        </span>

                                                        <ul className="flex gap-2.5 items-center">
                                                            <li className="text-xs font-light text-gray-400">
                                                                {formatDate(
                                                                    review.createdAt?.toISOString() ||
                                                                        "Ugyldig dato"
                                                                )}
                                                            </li>
                                                            <li>
                                                                <StarRating
                                                                    rating={[
                                                                        review.numStars,
                                                                    ]}
                                                                    size={10}
                                                                />
                                                            </li>
                                                        </ul>

                                                        <p>{review.comment}</p>
                                                    </div>
                                                </article>
                                            )
                                        );
                                    }
                                )}
                            </div>
                        </section>
                    </section>
                )
            )}
        </Container>
    );
};

export default DetailsPage;
