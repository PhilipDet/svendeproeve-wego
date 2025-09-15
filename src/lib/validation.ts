export const validation = {
    firstName: (value: string) => value.length > 0 || "Fornavn er påkrævet",
    lastName: (value: string) => value.length > 0 || "Efternavn er påkrævet",
    email: (value: string) =>
        /\S+@\S+\.\S+/.test(value) || "Ugyldig emailadresse",
    password: (value: string) =>
        (value.length >= 6 && /[!@#$%^&*]/.test(value)) ||
        "Adgangskode skal være mindst 6 tegn + 1 specialtegn",
};
