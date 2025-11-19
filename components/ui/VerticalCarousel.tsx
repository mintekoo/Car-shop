"use client";

import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

interface VerticalCarouselProps {
    children: ReactNode[];
    speed?: number;
    reverse?: boolean;
}

export default function VerticalCarousel({
    children,
    speed = 8000,
    reverse = false,
}: VerticalCarouselProps) {
    return (
        <div className="relative h-[420px] sm:h-[460px] md:h-[500px] overflow-hidden">

            {/* Top fade */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white dark:from-gray-900 to-transparent z-10" />

            {/* Bottom fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10" />

            <Swiper
                direction="vertical"
                modules={[Autoplay, FreeMode]}
                loop={true}
                slidesPerView={3}
                breakpoints={{
                    0: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                spaceBetween={24}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                    reverseDirection: reverse,
                }}
                freeMode={{
                    enabled: true,
                    momentum: false,
                }}
                speed={speed}
                className="h-full"
            >
                {children.map((child, i) => (
                    <SwiperSlide key={i} className="flex items-center">
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
