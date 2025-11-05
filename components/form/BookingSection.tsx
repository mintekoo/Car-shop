"use client";

import { useState } from "react";
import BookingForm from "./BookingForm";

export default function BookingSection({ productId, pricePerDay }: { productId: number; pricePerDay: number }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    return (
        <div className="space-y-4">
            {!isBookingOpen ? (
                <button
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition"
                >
                    Book Now
                </button>
            ) : (
                <BookingForm productId={productId} pricePerDay={pricePerDay} />
            )}
        </div>
    );
}
