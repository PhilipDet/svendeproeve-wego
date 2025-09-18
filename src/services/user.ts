import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/auth";
import { handlePrismaError } from "@/lib/error";

export const getUser = async (id: number) => {
    try {
        const result = await prisma.user.findUnique({
            where: { id },
            // include: {},
        });

        if (!result) throw new Error("User not found");

        return {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            description: result.description,
            imageUrl: result.imageUrl,
            isActive: result.isActive,
        };
    } catch (error: unknown) {
        throw new Error(handlePrismaError(error)?.message || "Database error");
    }
};

export const createUser = async ({
    firstName,
    lastName,
    email,
    password,
}: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email,
                password: hashedPassword,
                refreshToken: "",
            },
        });

        const accessToken = generateToken(newUser, "access");
        const refreshToken = generateToken(newUser, "refresh");

        await prisma.user.update({
            where: { id: newUser.id },
            data: { refreshToken },
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: newUser.id,
                email: newUser.email,
            },
        };
    } catch (error: unknown) {
        const prismaError = handlePrismaError(error);

        if (prismaError) {
            switch (prismaError.code) {
                case "P2002":
                    throw new Error("User already exists");
                default:
                    throw new Error("Database error");
            }
        } else {
            throw new Error("Unexpected error");
        }
    }
};
