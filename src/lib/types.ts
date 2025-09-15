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
    price: number | null;
    setPrice: (price: number | null) => void;
};
