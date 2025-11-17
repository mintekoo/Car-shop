// components/form/BookingForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import RadioButton from "@/components/ui/RadioButton";
import { API_BASE_URL } from "@/lib/api";

// Simple Ethiopian phone validation (matches backend logic)
function isValidEthiopianPhone(phone: string) {
    if (!phone) return false;
    const cleaned = phone.trim().replace(/[\s\-\(\)]/g, "");

    // +251912345678, 251912345678, 0912345678, 912345678
    return (
        /^\+2519\d{8}$/.test(cleaned) ||
        /^2519\d{8}$/.test(cleaned) ||
        /^09\d{8}$/.test(cleaned) ||
        /^9\d{8}$/.test(cleaned)
    );
}

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
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [driver, setDriver] = useState<"yes" | "no">("no");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Frontend phone validation
        if (!isValidEthiopianPhone(phone)) {
            setPhoneError("Invalid Ethiopian phone number");
            return;
        } else {
            setPhoneError(null);
        }

        setLoading(true);
        setToast(null);

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
                    driver,
                    totalPrice: calculateTotalPrice(),
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.error || "Booking failed");
            }

            setToast({ message: "Booking created successfully!", type: "success" });
            setFullName("");
            setPhone("");
            setStartDate("");
            setEndDate("");
        } catch (err: any) {
            setToast({ message: err.message || "Something went wrong", type: "error" });
        } finally {
            setLoading(false);
            setTimeout(() => setToast(null), 3000);
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
        <form onSubmit={handleSubmit} className="space-y-3 relative">
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
                    className={`mt-1 w-full rounded-md border px-3 py-2 ${phoneError ? "border-red-500" : ""
                        }`}
                    required
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
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
            <div>
                <label className="block text-sm font-medium">Need a Driver?</label>

                <div className="flex gap-4 mt-1">
                    <RadioButton
                        name="driver"
                        label="Yes"
                        value="yes"
                        checked={driver === "yes"}
                        onChange={setDriver}
                    />
                    <RadioButton
                        name="driver"
                        label="No"
                        value="no"
                        checked={driver === "no"}
                        onChange={setDriver}
                    />
                </div>
            </div>
            <div className="text-sm">
                Total Price: ETB {calculateTotalPrice()}
            </div>
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Booking..." : "Book Now"}
            </Button>

            {/* Inline Toast */}
            {toast && (
                <div
                    className={`fixed top-4 right-4 p-3 rounded shadow-md text-white z-50 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {toast.message}
                </div>
            )}
        </form>
    );
}
