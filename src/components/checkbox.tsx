import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const CheckBox = ({
    label,
    name,
    onChange,
    checked,
}: {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
}) => {
    return (
        <label
            htmlFor={name}
            className="flex items-center gap-2 relative text-sm hover:bg-muted-background"
        >
            <input
                type="checkbox"
                name={name}
                id={name}
                onChange={onChange}
                checked={checked}
                className="peer absolute opacity-0 w-full h-full cursor-pointer"
            />
            <div
                data-checked={checked}
                className="h-5 w-5 border-2 border-foreground flex justify-center items-center peer-checked:bg-light-blue"
            >
                <Check
                    className={cn(
                        checked ? "opacity-100" : "opacity-0",
                        "text-white"
                    )}
                    size={24}
                />
            </div>

            {label}
        </label>
    );
};
