"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function BookingSection({ service }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: service.id,
        serviceTitle: service.title,
        serviceImage: service.image,
        price: service.price,
        phone: form.phone.value,
        address: form.address.value,
        date: form.date.value,
        notes: form.notes.value,
      }),
    });

    setLoading(false);

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Booked!",
        text: `${service.title} has been booked successfully`,
      });
      setOpen(false);
      form.reset();
    } else {
      Swal.fire("Error", "Booking failed", "error");
    }
  };

  return (
    <div className="mt-10">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-purple-600 px-6 py-3 text-white font-medium hover:bg-purple-700 transition"
        >
          Book Now
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border bg-purple-50 p-6 space-y-4 animate-in fade-in slide-in-from-bottom-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="phone"
              required
              placeholder="Phone number"
              className="input"
            />
            <input
              name="address"
              required
              placeholder="Address / Location"
              className="input"
            />
          </div>

          <input type="date" name="date" required className="input w-full" />

          <textarea
            name="notes"
            placeholder="Additional notes (optional)"
            className="input w-full"
          />

          <button
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 py-3 text-white font-medium hover:bg-purple-700"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      )}
    </div>
  );
}
