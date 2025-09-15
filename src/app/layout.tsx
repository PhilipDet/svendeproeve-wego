"use client";

import { Footer } from "@/components/footer";
import "./globals.css";
import { Providers } from "./provider";
import { Navbar } from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col items-center">
                <Providers>
                    <ToastContainer position="top-right" autoClose={3000} />
                    <Navbar />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
