// components/form/BookingForm.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { API_BASE_URL } from "@/lib/api";

type BookingFormProps = {
    productId: number;
    pricePerDay: number;
};

export default function BookingForm({ productId, pricePerDay }: BookingFormProps) {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${API_BASE_URL}/api/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId,
                    fullName,
                    Phone: phone,
                    startDate,
                    endDate,
                    totalPrice: calculateTotalPrice(),
                }),
            });

            if (!res.ok) throw new Error("Booking failed");

            setMessage("Booking created successfully!");
            setStartDate("");
            setEndDate("");
        } catch (err: any) {
            setMessage(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalPrice = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
        return days * pricePerDay;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    required
                />
            </div>
            <div className="text-sm">
                Total Price: ETB {calculateTotalPrice()}
            </div>
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Booking..." : "Book Now"}
            </Button>
            {message && <p className="text-sm text-red-500">{message}</p>}
        </form>
    );
}
