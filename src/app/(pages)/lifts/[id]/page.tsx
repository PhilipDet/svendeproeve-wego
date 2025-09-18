"use client";

import { Container } from "@/components/container";
import { use, useEffect, useState } from "react";
import { useTrip } from "@/hooks/useTrips";
import { formatDate, formatDateShort } from "@/lib/utils";
import Image from "next/image";
import { StarRating } from "@/components/starRating";
import { ReviewsReceived } from "@/lib/types";
import { LiftDetail } from "@/components/liftDetail";
import { LiftPreferences } from "@/components/liftPreferences";
import { BookedSeat } from "@/components/bookedSeat";
import { useBookings } from "@/hooks/useBookings";
import Link from "next/link";
import { ReviewModal } from "@/components/reviewModal";
import { useAuth } from "@/context/authContext";
import { X } from "lucide-react";
import { deleteReview } from "@/services/reviews";

const DetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { trip, loading } = useTrip(Number(id));
    const { bookings, loadingBookings } = useBookings(Number(id));
    const { user, loadingUser } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [reviews, setReviews] = useState<ReviewsReceived[] | null>(null);

    useEffect(() => {
        if (!loading && trip?.user?.reviewsRecieved) {
            setReviews(
                trip.user.reviewsRecieved.sort((a, b) => {
                    const dateA = a.createdAt ? a.createdAt.getTime() : 0;
                    const dateB = b.createdAt ? b.createdAt.getTime() : 0;
                    return dateB - dateA;
                })
            );
        }
    }, [trip?.user?.reviewsRecieved, loading]);

    return (
        <>
            <Container className="md:grid grid-cols-3 items-start gap-8">
                {loading ? (
                    <p className="col-span-3">Henter detaljer om turen...</p>
                ) : (
                    trip && (
                        <>
                            <section className="col-span-2 w-full flex flex-col gap-8 bg-background p-4 rounded-2xl">
                                <article className="flex flex-col gap-1">
                                    <h1 className="font-extrabold text-xl">
                                        {trip.cityDeparture} til{" "}
                                        {trip.cityDestination}
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
                                    <section className="grid grid-cols-2 gap-x-8 gap-y-2">
                                        {trip.hasComfort && (
                                            <LiftDetail
                                                label="Komfort"
                                                paragraf="Maks. 2 personer på bagsædet"
                                                imageurl="/images/icons/users.svg"
                                            />
                                        )}
                                        {trip.isElectric && (
                                            <LiftDetail
                                                label="Brændstoftype"
                                                paragraf="Bilen er elektrisk"
                                                imageurl="/images/icons/lightning2.svg"
                                            />
                                        )}

                                        <LiftDetail
                                            label="Bagagestørrelse"
                                            paragraf={
                                                trip.bagSizeId === 1
                                                    ? "Lille skuldertaske eller rygsæk"
                                                    : trip.bagSizeId === 2
                                                    ? "Kuffert eller sportstaske"
                                                    : trip.bagSizeId === 3
                                                    ? "Stor kuffert eller flere tasker"
                                                    : "Ugyldig bagagestørrelse"
                                            }
                                            imageurl={
                                                "/images/icons/bag-md.svg"
                                            }
                                        />
                                        <LiftDetail
                                            label="Afvigelser fra ruten"
                                            paragraf="Bilisten er fleksibel"
                                            imageurl="/images/icons/route.svg"
                                        />
                                    </section>

                                    <span className="text-sm font-medium">
                                        Præferencer
                                    </span>

                                    <section className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                                        <LiftPreferences
                                            label="Kæledyr"
                                            allowed={trip.allowPets || false}
                                        />
                                        <LiftPreferences
                                            label="Musik"
                                            allowed={trip.allowMusic || false}
                                        />
                                        <LiftPreferences
                                            label="Børn"
                                            allowed={
                                                trip.allowChildren || false
                                            }
                                        />
                                        <LiftPreferences
                                            label="Rygning"
                                            allowed={trip.allowSmoking || false}
                                        />
                                    </section>
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
                                                {trip.user?.lastName.slice(
                                                    0,
                                                    1
                                                )}
                                                .
                                            </span>

                                            <ul className="flex gap-2.5 items-center">
                                                <li>
                                                    <StarRating
                                                        rating={
                                                            trip.user?.reviewsRecieved?.map(
                                                                (
                                                                    review: ReviewsReceived
                                                                ) =>
                                                                    review.numStars
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

                                            {!loadingUser && user && (
                                                <button
                                                    className="btn"
                                                    onClick={() =>
                                                        setIsOpen(true)
                                                    }
                                                >
                                                    Skriv en anmeldelse
                                                </button>
                                            )}
                                        </div>
                                    </article>

                                    <div className="flex flex-col gap-5">
                                        {reviews &&
                                            reviews.map(
                                                (review, index) =>
                                                    review && (
                                                        <article
                                                            key={index}
                                                            className="flex gap-4 bg-muted-background py-2 px-2.5 rounded-2xl"
                                                        >
                                                            <div className="flex items-center">
                                                                <Image
                                                                    src={
                                                                        review
                                                                            .reviewer
                                                                            ?.imageUrl ||
                                                                        "/images/placeholder.png"
                                                                    }
                                                                    alt="Billede af personen der har lagt en anmeldelse"
                                                                    width={30}
                                                                    height={30}
                                                                    className="rounded-full aspect-square"
                                                                />
                                                            </div>
                                                            <div className="w-full flex flex-col gap-0.5">
                                                                <ul className="flex justify-between items-center">
                                                                    <li className="text-lg font-extrabold">
                                                                        {
                                                                            review
                                                                                .reviewer
                                                                                ?.firstName
                                                                        }{" "}
                                                                        {review.reviewer?.lastName.slice(
                                                                            0,
                                                                            1
                                                                        )}
                                                                        .
                                                                    </li>
                                                                    {review
                                                                        .reviewer
                                                                        ?.id ===
                                                                        user?.id && (
                                                                        <li
                                                                            onClick={async () => {
                                                                                const response =
                                                                                    await deleteReview(
                                                                                        review.id ||
                                                                                            0
                                                                                    );

                                                                                if (
                                                                                    response
                                                                                )
                                                                                    setReviews(
                                                                                        (
                                                                                            prev:
                                                                                                | ReviewsReceived[]
                                                                                                | null
                                                                                        ) =>
                                                                                            prev
                                                                                                ? prev.filter(
                                                                                                      (
                                                                                                          rev
                                                                                                      ) =>
                                                                                                          rev.id !==
                                                                                                          review.id
                                                                                                  )
                                                                                                : null
                                                                                    );
                                                                            }}
                                                                        >
                                                                            <X />
                                                                        </li>
                                                                    )}
                                                                </ul>

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
                                                                            size={
                                                                                10
                                                                            }
                                                                        />
                                                                    </li>
                                                                </ul>

                                                                <p>
                                                                    {
                                                                        review.comment
                                                                    }
                                                                </p>
                                                            </div>
                                                        </article>
                                                    )
                                            )}
                                    </div>
                                </section>
                            </section>

                            <section className="w-full flex flex-col gap-2 mt-12">
                                <h2 className="text-lg font-extrabold">
                                    Pladser
                                </h2>
                                <section className="bg-background p-4 rounded-2xl flex flex-col gap-4">
                                    {loadingBookings ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <>
                                            {bookings.map((booking, index) => (
                                                <BookedSeat
                                                    key={`booked-${index}`}
                                                    firstName={
                                                        booking.user
                                                            ?.firstName ||
                                                        "Ukendt Navn"
                                                    }
                                                    imageUrl={
                                                        booking.user?.imageUrl
                                                    }
                                                />
                                            ))}

                                            {Array.from({
                                                length:
                                                    trip.seatsTotal -
                                                    bookings.length,
                                            }).map((_, index) => (
                                                <BookedSeat
                                                    key={`empty-${index}`}
                                                    firstName="Dig?"
                                                />
                                            ))}
                                        </>
                                    )}

                                    <ul className="flex justify-between">
                                        <li>Pris per plads</li>
                                        <li className="text-sm text-gray-400 font-medium flex items-center gap-4">
                                            DKK
                                            <span className="text-xl text-foreground font-extrabold">
                                                {trip.pricePerSeat}
                                            </span>
                                        </li>
                                    </ul>

                                    {!loadingUser && user ? (
                                        <Link
                                            href={`/booking/${trip.id}`}
                                            className="btn text-center"
                                        >
                                            Book Plads
                                        </Link>
                                    ) : (
                                        <span className="btn bg-red text-center">
                                            Login for at booke
                                        </span>
                                    )}
                                </section>
                            </section>
                        </>
                    )
                )}
            </Container>

            <ReviewModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                userId={user?.id || 0}
                driverId={trip?.user?.id || 0}
                onCreateReview={(newReview) =>
                    setReviews((prev) => [newReview, ...(prev || [])])
                }
            />
        </>
    );
};

export default DetailsPage;
