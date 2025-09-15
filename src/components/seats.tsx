export const Seats = ({
    totalSeats,
    bookedSeats,
}: {
    totalSeats: number;
    bookedSeats: number[];
}) => {
    const totalBookedSeats = bookedSeats.reduce((acc, curr) => acc + curr, 0);

    return (
        <>
            {Array.from({ length: totalSeats })
                .map((_, index) => (
                    <li
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index < totalBookedSeats ? "bg-red" : "bg-green"
                        }`}
                    ></li>
                ))
                .reverse()}
        </>
    );
};
