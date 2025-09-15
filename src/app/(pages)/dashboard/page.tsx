"use client";

import { Container } from "@/components/container";
import { useAuth } from "@/context/authContext";

const DashboardPage = () => {
    const { user, loadingUser, logout } = useAuth();

    return (
        <Container>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {loadingUser ? (
                <span>Henter Bruger...</span>
            ) : (
                user && (
                    <>
                        <span>
                            Velkommen, {user.firstName} {user.lastName}
                        </span>
                        <button onClick={logout} className="btn">
                            Logud
                        </button>

                        <pre className="p-2 bg-muted-background rounded-lg">
                            {JSON.stringify(user, null, 2)}
                        </pre>
                    </>
                )
            )}
        </Container>
    );
};

export default DashboardPage;
