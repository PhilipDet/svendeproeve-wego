import { Container } from "@/components/container";

const DetailsPage = ({ params }: { params: { id: number } }) => {
    return <Container>Details Page for Lift ID: {params.id}</Container>;
};

export default DetailsPage;
