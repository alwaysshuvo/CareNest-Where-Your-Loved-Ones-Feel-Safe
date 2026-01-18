"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function BookingForm({ service }: { service: any }) {
  const { data: session, status } = useSession();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    address: "",
    date: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOpenForm = () => {
    if (status !== "authenticated") {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to book this service",
        confirmButtonColor: "#7c3aed",
      });
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          serviceTitle: service.title,
          serviceImage: service.image || null,
          price: service.price,
          phone: form.phone,
          address: form.address,
          date: form.date,
          notes: form.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      Swal.fire({
        icon: "success",
        title: "Booked Successfully 🎉",
        html: `
          <b>${service.title}</b><br/>
          Booking confirmed for <b>${session?.user?.email}</b>
        `,
        confirmButtonColor: "#7c3aed",
      });

      setForm({
        phone: "",
        address: "",
        date: "",
        notes: "",
      });
      setShowForm(false);
    } catch (err: any) {
      Swal.fire("Error", err.message || "Booking failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12">
      {/* 🔥 BOOK NOW BUTTON */}
      {!showForm && (
        <div className="rounded-2xl bg-purple-50 p-8 text-center">
          <h3 className="text-xl font-semibold mb-3">
            Ready to book this service?
          </h3>
          <p className="text-gray-600 mb-6">
            Click below to proceed with booking
          </p>
          <button
            onClick={handleOpenForm}
            className="rounded-lg bg-purple-600 px-8 py-3 font-medium text-white hover:bg-purple-700 transition"
          >
            Book Now
          </button>
        </div>
      )}

      {/* 🔥 FORM (Animated) */}
      {showForm && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-5 duration-300 rounded-2xl border bg-white p-8 shadow">
          <h3 className="mb-6 text-xl font-semibold text-purple-600">
            Book {service.title}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* USER INFO */}
            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={session?.user?.name || ""}
                readOnly
                className="rounded-lg border bg-gray-100 px-4 py-3 text-sm"
              />
              <input
                value={session?.user?.email || ""}
                readOnly
                className="rounded-lg border bg-gray-100 px-4 py-3 text-sm"
              />
            </div>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              required
              className="w-full rounded-lg border px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
            />

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address / Location"
              required
              className="w-full rounded-lg border px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
            />

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Additional notes (optional)"
              rows={3}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-purple-600 py-3 font-medium text-white hover:bg-purple-700 disabled:opacity-60"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border px-6 py-3 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
