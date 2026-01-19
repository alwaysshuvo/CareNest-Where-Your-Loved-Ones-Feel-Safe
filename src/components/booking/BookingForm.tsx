"use client";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function BookingForm({ service }) {
  const { data: session } = useSession();

  const [duration, setDuration] = useState(1);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // 💰 Total price auto calculate
  const totalCost = useMemo(() => {
    return duration * service.price;
  }, [duration, service.price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !division || !district || !address) {
      Swal.fire("Missing info", "Please fill all required fields", "warning");
      return;
    }

    setLoading(true);

    const bookingData = {
      userName: session?.user?.name,
      userEmail: session?.user?.email,
      phone,
      serviceId: service.id,
      serviceTitle: service.title,
      serviceImage: service.image,
      price: service.price,
      duration,
      division,
      district,
      address,
      totalCost,
      notes: notes || "N/A",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error();

      Swal.fire("Success 🎉", "Booking confirmed!", "success");
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-6 rounded-2xl bg-white p-6 shadow-lg"
    >
      {/* USER INFO */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            value={session?.user?.name || ""}
            readOnly
            className="mt-1 w-full rounded-lg border bg-gray-100 px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            value={session?.user?.email || ""}
            readOnly
            className="mt-1 w-full rounded-lg border bg-gray-100 px-4 py-2"
          />
        </div>
      </div>

      {/* PHONE */}
      <div>
        <label className="text-sm font-medium">Phone Number *</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="01XXXXXXXXX"
          className="mt-1 w-full rounded-lg border px-4 py-2"
          required
        />
      </div>

      {/* DURATION */}
      <div>
        <label className="text-sm font-medium">Duration (days)</label>
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border px-4 py-2"
        />
      </div>

      {/* LOCATION */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Division</label>
          <input
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            placeholder="Dhaka"
            className="mt-1 w-full rounded-lg border px-4 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">District</label>
          <input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Uttarkhan"
            className="mt-1 w-full rounded-lg border px-4 py-2"
          />
        </div>
      </div>

      {/* ADDRESS */}
      <div>
        <label className="text-sm font-medium">Full Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 w-full rounded-lg border px-4 py-2"
          placeholder="House no, road, area"
        />
      </div>

      {/* NOTES */}
      <div>
        <label className="text-sm font-medium">Notes (optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 w-full rounded-lg border px-4 py-2"
          placeholder="Any special instruction..."
        />
      </div>

      {/* TOTAL */}
      <div className="rounded-xl bg-purple-50 p-4 text-lg font-semibold text-purple-700">
        Total Cost: ৳{totalCost}
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        className="w-full rounded-xl bg-purple-600 py-3 text-white font-semibold hover:bg-purple-700 disabled:opacity-60"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}
