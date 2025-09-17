import { useBookings } from "@/hooks/useBookings";
import Image from "next/image";

export const BookedSeat = ({
    firstName,
    imageUrl,
}: {
    firstName: string;
    imageUrl?: string;
}) => {
    return (
        <>
            <div className="flex flex-col gap-3">
                <article className="flex items-center gap-3">
                    <Image
                        src={imageUrl || "/images/user-placeholder.png"}
                        alt={`${firstName} Profil billede`}
                        width={50}
                        height={50}
                        className="rounded-full aspect-square object-cover"
                    />
                    <span>{firstName}</span>
                </article>
                <hr className="border-1 border-gray-300" />
            </div>
        </>
    );
};
