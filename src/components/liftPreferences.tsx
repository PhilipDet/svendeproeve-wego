import { Check, X } from "lucide-react";

export const LiftPreferences = ({
    label,
    allowed,
}: {
    label: string;
    allowed: boolean;
}) => {
    return (
        <article className="flex items-center gap-2.5">
            {allowed ? (
                <Check className="text-green" />
            ) : (
                <X className="text-red" />
            )}
            <span className="text-sm font-medium">{label}</span>
        </article>
    );
};
