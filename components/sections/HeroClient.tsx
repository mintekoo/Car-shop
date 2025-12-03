"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import HeroProductsCarousel from "./HeroProductsCarousel";

interface HeroClientProps {
    featuredProducts: Product[];
}

export default function HeroClient({ featuredProducts }: HeroClientProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroRef = useRef<HTMLDivElement>(null);

    const hoverActive = useRef(false);
    const scrollActive = useRef(false);
    const autoInterval = useRef<NodeJS.Timeout | null>(null);

    const total = featuredProducts.length;

    // ---------------------------------------------------
    // 1️⃣ AUTO MODE (useCallback to avoid ESLint warnings)
    // ---------------------------------------------------
    const startAutoMode = useCallback(() => {
        if (hoverActive.current || scrollActive.current) return;

        if (autoInterval.current) clearInterval(autoInterval.current);

        autoInterval.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % total);
        }, 5000);
    }, [total]);

    // ---------------------------------------------------
    // 2️⃣ SCROLL MODE (useCallback)
    // ---------------------------------------------------
    const handleScroll = useCallback(() => {
        if (hoverActive.current) return;

        scrollActive.current = true;
        if (autoInterval.current) clearInterval(autoInterval.current);

        const scrollY = window.scrollY;

        const index = Math.floor(scrollY / 80) % total;

        setCurrentSlide(index);

        // Resume auto after 1.5s
        setTimeout(() => {
            scrollActive.current = false;
            if (!hoverActive.current) startAutoMode();
        }, 1500);
    }, [startAutoMode, total]);

    // ---------------------------------------------------
    // 3️⃣ MOUSE MOVE (hover-based change)
    // ---------------------------------------------------
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        hoverActive.current = true;
        scrollActive.current = false;

        if (autoInterval.current) clearInterval(autoInterval.current);

        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gridX = Math.floor((x / rect.width) * 3);
        const gridY = Math.floor((y / rect.height) * 3);

        let index = gridY * 3 + gridX;
        index = index % total;

        setCurrentSlide(index);
    };

    const handleMouseLeave = () => {
        hoverActive.current = false;
        startAutoMode();
    };

    // ---------------------------------------------------
    // COMPONENT MOUNT
    // ---------------------------------------------------
    useEffect(() => {
        startAutoMode();
        window.addEventListener("scroll", handleScroll);

        return () => {
            if (autoInterval.current) clearInterval(autoInterval.current);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll, startAutoMode]);

    return (
        <section
        
            ref={heroRef}
            className="relative w-full h-screen overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <HeroProductsCarousel
                products={featuredProducts}
                currentSlide={currentSlide}
            />

            {/* TEXT */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                <span className="mb-4 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 rounded-full">
                    Premium Cars, Premium Service
                </span>

                <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
                    Find your next car with confidence
                </h1>

                <p className="text-lg sm:text-2xl text-white mt-4 drop-shadow-md">
                    Elevate your travel experience with Adinas
                </p>
            </div>
        </section>
    );
}
