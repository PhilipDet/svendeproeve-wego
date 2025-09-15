import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export function InputField({
    label,
    type = "text",
    registration,
    error,
}: {
    label: string;
    type?: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="label">
                {label}
                <input type={type} {...registration} className="input" />
            </label>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}
