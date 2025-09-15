import { Prisma } from "@prisma/client";
import { FieldError } from "react-hook-form";

export const handlePrismaError = (
    error: unknown
): Prisma.PrismaClientKnownRequestError | null => {
    return error instanceof Prisma.PrismaClientKnownRequestError ? error : null;
};

export const handleFormError = (error: unknown): error is FieldError => {
    return error instanceof Object && "message" in error;
};

export const handleError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return "Der opstod en fejl";
};
