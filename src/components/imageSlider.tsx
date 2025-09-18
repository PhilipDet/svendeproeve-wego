"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSlides } from "@/hooks/useSlides";
import Image from "next/image";

export default function ImageSlider() {
    const { slides, loadingSlides } = useSlides();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!slides || slides.length === 0) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides]);

    const currentSlide = slides[index];

    return (
        <div className="-z-10 relative h-full">
            {loadingSlides || !slides || slides.length === 0 ? (
                <Image
                    src="/images/slides/cars-and-trees.svg"
                    alt="Henter slides"
                    width={1920}
                    height={1080}
                    quality={80}
                    className="-z-10 fixed w-full h-dvh inset-0 object-cover"
                />
            ) : (
                <AnimatePresence>
                    <motion.div
                        key={index}
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="fixed inset-0 opacity-100 w-full h-full flex justify-center items-center"
                    >
                        <h1 className="max-w-[1260px] mx-5 z-30 text-8xl text-shadow-md text-white font-bold text-center mt-40 max-lg:text-8xl max-md:hidden">
                            {currentSlide.text}
                        </h1>
                        <Image
                            src={currentSlide.imageUrl}
                            alt={currentSlide.text}
                            width={1920}
                            height={1080}
                            quality={80}
                            className="-z-10 fixed w-full h-dvh inset-0 object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
}
