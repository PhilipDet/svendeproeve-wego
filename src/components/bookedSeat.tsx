import Image from "next/image";
import { cn } from "@/lib/utils";

export const BookedSeat = ({
    firstName,
    imageUrl,
    className,
}: {
    firstName: string;
    imageUrl?: string;
    className?: string;
}) => {
    return (
        <>
            <div className={cn("flex flex-col gap-3", className)}>
                <article className="flex items-center gap-3">
                    <Image
                        src={imageUrl || "/images/user-placeholder.png"}
                        alt={`${firstName} Profil billede`}
                        width={50}
                        height={50}
                        className="rounded-full aspect-square object-cover"
                    />
                    <span className="max-md:hidden">{firstName}</span>
                </article>
                <hr className="max-md:hidden border-1 border-gray-300" />
            </div>
        </>
    );
};
