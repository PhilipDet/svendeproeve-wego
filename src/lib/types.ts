export type UserType = {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
    isActive?: boolean;
} | null;

export type LoginType = {
    email: string;
    password: string;
};

export type SignupType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type AuthContextType = {
    user: UserType;
    loadingUser: boolean;
    login: (data: LoginType) => Promise<{ message: string; status: number }>;
    signup: (data: SignupType) => Promise<{ message: string; status: number }>;
    logout: () => void;
    fetchUser: () => void;
};

export type FilterContextType = {
    locationFrom: string | null;
    setLocationFrom: (locationFrom: string | null) => void;
    locationTo: string | null;
    setLocationTo: (locationTo: string | null) => void;
    seats: number | null;
    setSeats: (seats: number | null) => void;
    luggageSize: string | null;
    setLuggageSize: (luggageSize: string | null) => void;
    comfort: boolean;
    setComfort: (comfort: boolean) => void;
    music: boolean;
    setMusic: (music: boolean) => void;
    animals: boolean;
    setAnimals: (animals: boolean) => void;
    kids: boolean;
    setKids: (kids: boolean) => void;
    smoking: boolean;
    setSmoking: (smoking: boolean) => void;
};
