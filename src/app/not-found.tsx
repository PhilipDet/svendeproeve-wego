import { Container } from "@/components/container";

const NotFound = () => {
    return (
        <Container>
            <h1 className="text-4xl font-bold text-center">
                404 - Siden blev ikke fundet...
            </h1>
            <p className="text-lg text-gray-600 text-center">
                Den side, du leder efter, findes ikke.
            </p>
        </Container>
    );
};

export default NotFound;
