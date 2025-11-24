// components/form/RentalForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { API_BASE_URL } from "@/lib/api";

type RentalFormProps = {
    rentalId?: number;
    onSuccess?: () => void;
};

export default function RentalForm({ rentalId, onSuccess }: RentalFormProps) {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [features, setFeatures] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const handleFeatureChange = (index: number, value: string) => {
        const updated = [...features];
        updated[index] = value;
        setFeatures(updated);
    };

    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !phone || !price || !startDate || !endDate) {
            setToast({ message: "Please fill all required fields", type: "error" });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("Phone", phone);
        formData.append("price", price.toString());
        formData.append("features", JSON.stringify(features));
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);

        images.forEach((file) => formData.append("images", file));

        try {
            const res = await fetch(`${API_BASE_URL}/api/rentals${rentalId ? `/${rentalId}` : ""}`, {
                method: rentalId ? "PUT" : "POST",
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Something went wrong");
            }

            setToast({ message: rentalId ? "Rental updated!" : "Rental created!", type: "success" });
            if (onSuccess) onSuccess();
        } catch (err: any) {
            setToast({ message: err.message || "Error submitting form", type: "error" });
        } finally {
            setLoading(false);
            setTimeout(() => setToast(null), 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded shadow-md">
            <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="mt-1 w-full border rounded-md px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Features</label>
                {features.map((f, idx) => (
                    <div key={idx} className="flex gap-2 mt-1">
                        <input
                            type="text"
                            value={f}
                            onChange={(e) => handleFeatureChange(idx, e.target.value)}
                            className="flex-1 border rounded-md px-2 py-1"
                        />
                        <button type="button" onClick={() => removeFeature(idx)} className="text-red-500">
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addFeature} className="mt-1 text-blue-500">
                    + Add Feature
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium">Images</label>
                <input type="file" multiple onChange={handleFileChange} className="mt-1" />
            </div>

            <div>
                <label className="block text-sm font-medium">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required />
            </div>

            <div>
                <label className="block text-sm font-medium">End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? (rentalId ? "Updating..." : "Creating...") : rentalId ? "Update Rental" : "Create Rental"}
            </Button>

            {toast && (
                <div
                    className={`fixed bottom-4 right-4 left-4 md:left-auto md:max-w-xs p-3 rounded shadow-md text-white z-50 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {toast.message}
                </div>
            )}
        </form>
    );
}
