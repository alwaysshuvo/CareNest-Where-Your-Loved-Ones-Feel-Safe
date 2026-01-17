"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function BookingForm({ service }: { service: any }) {
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status !== "authenticated") {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to book this service",
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service.id,
          serviceTitle: service.title,
          price: service.price,
          phone: form.phone,
          address: form.address,
          date: form.date,
          notes: form.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      Swal.fire({
        icon: "success",
        title: "Booked Successfully 🎉",
        html: `
          <p class="font-semibold">${service.title}</p>
          <p class="text-sm text-gray-500 mt-1">
            Booking confirmation sent for <b>${form.email}</b>
          </p>
        `,
        confirmButtonColor: "#7c3aed",
      });

      setForm({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        address: "",
        date: "",
        notes: "",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 rounded-2xl border bg-white p-8 shadow-sm">
      <h3 className="mb-6 text-xl font-semibold text-purple-600">
        Book this service
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* NAME + EMAIL */}
        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="name"
            value={form.name}
            readOnly
            className="rounded-lg border bg-gray-100 px-4 py-3 text-sm"
          />

          <input
            name="email"
            value={form.email}
            readOnly
            className="rounded-lg border bg-gray-100 px-4 py-3 text-sm"
          />
        </div>

        {/* PHONE */}
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number"
          required
          className="w-full rounded-lg border px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
        />

        {/* ADDRESS */}
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address / Location"
          required
          className="w-full rounded-lg border px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
        />

        {/* DATE */}
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
        />

        {/* NOTES */}
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional notes (optional)"
          rows={3}
          className="w-full rounded-lg border px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-purple-600 py-3 font-medium text-white transition hover:bg-purple-700 disabled:opacity-60"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
