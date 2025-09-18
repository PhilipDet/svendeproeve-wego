import { MapPin, Target } from "lucide-react";

export const LiftsWhere = ({
    icon,
    city,
    address,
}: {
    icon: "Target" | "MapPin";
    city: string;
    address: string;
}) => {
    return (
        <div className="flex gap-2 max-md:py-2 max-md:px-4 max-md:border-2 max-md:border-gray-300 max-md:rounded-full">
            {icon === "Target" ? (
                <Target size={18} className="text-light-blue" />
            ) : (
                icon === "MapPin" && (
                    <MapPin size={18} className="text-light-blue" />
                )
            )}
            <div className="w-full flex justify-between md:flex-col">
                <p className="text-sm font-extrabold">{city}</p>
                <p className="text-sm break-words">{address}</p>
            </div>
        </div>
    );
};
