"use client";

import { Footer } from "@/components/footer";
import "./globals.css";
import { Providers } from "./provider";
import { Navbar } from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShowContent } from "@/components/showContent";
import { Suspense } from "react";

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col items-center">
                <Suspense fallback={null}>
                    <Providers>
                        <ToastContainer position="top-right" autoClose={3000} />
                        <Navbar />
                        <ShowContent>{children}</ShowContent>
                        <Footer />
                    </Providers>
                </Suspense>
            </body>
        </html>
    );
};

export default RootLayout;
