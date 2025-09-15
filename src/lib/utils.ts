import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const formatPrice = (price: number) => {
    if (price === null) return "Ukendt pris";

    return (
        new Intl.NumberFormat("da-DK", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price) + " DKK"
    );
};

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const formatDate = (date: string) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day}. ${months[month]} ${year} kl. ${formattedHours}:${formattedMinutes}`;
};

export const tripFormattedDate = (dateString: string) => {
    if (!dateString) return "Ugyldig dato";

    const date = new Date(dateString);
    const today = new Date();
    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    const isTomorrow =
        date.getDate() === today.getDate() + 1 &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    const minutes =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    const showTime = `${date.getHours()}:${minutes}`;
    const showDate = `${date.getDate()} ${months[date.getMonth()].slice(0, 3)}`;

    if (isToday) {
        return `I dag ${showTime}`;
    }
    if (isTomorrow) {
        return `I morgen ${showTime}`;
    }

    return `${showDate} ${showTime}`;
};
