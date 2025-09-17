import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export function InputField({
    label,
    type = "text",
    placeholder,
    registration,
    error,
    format,
}: {
    label: string;
    type?: string;
    placeholder?: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
    format?: (value: string) => string;
}) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (format) {
            e.target.value = format(e.target.value);
        }
        registration.onChange(e);
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="label">
                {label}
                {type === "textarea" ? (
                    <textarea
                        {...registration}
                        onChange={handleChange}
                        className="input h-23"
                        placeholder={placeholder}
                    />
                ) : (
                    <input
                        type={type}
                        {...registration}
                        onChange={handleChange}
                        className="input"
                        placeholder={placeholder}
                    />
                )}
            </label>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}
