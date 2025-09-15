import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number[] }) => {
    const calculateRating = (ratings: number[]) => {
        if (ratings.length === 0) return 0;
        const total = ratings.reduce((acc, rating) => acc + rating, 0);
        return total / ratings.length;
    };

    const totalStars = 5;
    const fullStars = Math.floor(calculateRating(rating));
    const emptyStars = totalStars - fullStars;
    return (
        <div className="flex items-center">
            {Array.from({ length: fullStars }).map((_, index) => (
                <Star key={index} size={16} className="full-star" />
            ))}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <Star key={index} size={16} className="half-star" />
            ))}
        </div>
    );
};
