export type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    imageUrl: string;
    isActive?: boolean;
    reviewsRecieved?: ReviewsReceived[];
    createdAt?: Date;
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
    seats: number;
    setSeats: (seats: number) => void;
    luggageSize: number | null;
    setLuggageSize: (luggageSize: number | null) => void;
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
    resetFilter: () => void;
};

export type TripType = {
    id: number;
    user?: UserType;
    reviewsReceived?: number[];
    bookings?: number[];
    departureDate: Date;
    cityDeparture: string;
    addressDeparture: string;
    cityDestination: string;
    addressDestination: string;
    seatsTotal: number;
    bagSizeId: number;
    pricePerSeat: number;
    useFerry: boolean;
    isElectric: boolean;
    allowChildren?: boolean;
    allowSmoking?: boolean;
    allowMusic?: boolean;
    allowPets?: boolean;
    hasComfort?: boolean;
    comment?: string;
    createdAt?: Date;
};

export type ReviewsReceived = {
    numStars: number;
    comment?: string;
    createdAt?: Date;
    reviewer?: {
        firstName: string;
        lastName: string;
        imageUrl: string;
    };
};
