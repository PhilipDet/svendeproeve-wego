// Importer nødvendige biblioteker og instanser
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";
import { handleError } from "./error";

// Interface til at typedele JWT payload (data + exp)
interface jwtPayload {
    exp: number;
    data: {
        id: number;
    };
}

// Funktion til at generere JWT (access eller refresh token)
export const generateToken = (
    user: { id: number },
    type: "access" | "refresh"
): string => {
    // Find nøgle og udløbstid fra environment-variabler
    const key = process.env[`TOKEN_${type.toUpperCase()}_KEY`];
    const expires_in =
        process.env[`TOKEN_${type.toUpperCase()}_EXPIRATION_SECS`];

    if (!key || !expires_in) {
        throw new Error(`Missing env vars for ${type} token`);
    }

    // Beregn udløbstidspunkt i Unix timestamp (sekunder)
    const expTime = Math.floor(Date.now() / 1000) + Number(expires_in);

    // Opret og returnér signeret JWT
    return jwt.sign({ exp: expTime, data: { id: user.id } }, key);
};

// Funktion til at logge en bruger ind med email og password
export const authenticateUser = async (email: string, password: string) => {
    try {
        // Find bruger i databasen baseret på email og aktiv-status
        const user = await prisma.user.findUnique({
            where: { email, isActive: true },
            select: {
                id: true,
                password: true,
                isActive: true,
            },
        });

        // Returnér null hvis bruger ikke findes
        if (!user) throw new Error("Ugyldig email eller adgangskode");

        // Sammenlign plaintext password med hashed password i DB
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new Error("Ugyldig email eller adgangskode");

        // Generér access og refresh token
        const refreshToken = generateToken(user, "refresh");
        const accessToken = generateToken(user, "access");

        // Gem refresh token i databasen
        const update = await prisma.user.update({
            where: { id: user.id },
            data: {
                refreshToken,
            },
        });

        if (!update) throw new Error("Kunne ikke opdatere bruger med token");

        // Returnér tokens
        return {
            accessToken,
            refreshToken,
        };
    } catch (error: unknown) {
        throw new Error(handleError(error));
    }
};

// Verificér et refresh token og returnér et nyt access token
export const verifyRefreshToken = async (refreshToken: string) => {
    // Find bruger der matcher refresh token
    const user = await prisma.user.findFirst({
        where: { refreshToken },
    });

    if (!user) return null;

    // Verificér refresh token – smider fejl hvis invalid
    jwt.verify(refreshToken, process.env.TOKEN_REFRESH_KEY!);

    // Generér og returnér nyt access token
    const accessToken = generateToken(user, "access");
    return accessToken;
};

// Ekstraher bruger-ID fra access token
export const getUserIdFromToken = (token: string): number | null => {
    try {
        const decoded = jwt.verify(
            token,
            process.env.TOKEN_ACCESS_KEY!
        ) as jwtPayload;
        return decoded.data.id;
    } catch {
        // Token er ugyldigt eller udløbet
        return null;
    }
};
