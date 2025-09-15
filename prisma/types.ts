export const fieldTypes: Record<
    string,
    Record<string, "string" | "number" | "boolean" | "date">
> = {
    user: {
        id: "number",
        email: "string",
        password: "string",
        refreshToken: "string",
        isActive: "boolean",
    },
};
