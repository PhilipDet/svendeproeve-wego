export const validation = {
    firstName: (value: string) => value.length > 0 || "Fornavn er påkrævet",
    lastName: (value: string) => value.length > 0 || "Efternavn er påkrævet",
    email: (value: string) =>
        /\S+@\S+\.\S+/.test(value) || "Ugyldig emailadresse",
    password: (value: string) =>
        (value.length >= 6 && /[!@#$%^&*]/.test(value)) ||
        "Adgangskode skal være mindst 6 tegn + 1 specialtegn",
    cardNumber: (value: string) =>
        /^\d{16}$/.test(value.replace(/\s+/g, "")) || "Ugyldigt kortnummer",
    expiryDate: (value: string) =>
        /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value) || "Ugyldig udløbsdato",
    cvv: (value: string) => /^\d{3,4}$/.test(value) || "Ugyldig CVV",
    comment: (value: string) => value.length > 0 || "Anmeldelse skal udfyldes",
};
