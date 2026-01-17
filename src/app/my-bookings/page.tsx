"use client";

import { useEffect, useState } from "react";
import BookingCard from "@/components/booking/BookingCard";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleCancel = async (id: string, reason: string) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason }),
    });

    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b._id !== id));
    }
  };

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* PAGE HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Booked Services
          </h1>
          <p className="mt-2 text-gray-500">
            Here is all your booked services
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="rounded-xl bg-white py-20 text-center">
            <p className="text-gray-500">Loading bookings...</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && bookings.length === 0 && (
          <div className="rounded-xl bg-white py-20 text-center">
            <p className="text-gray-600">
              You have no bookings yet
            </p>
          </div>
        )}

        {/* BOOKINGS */}
        {!loading && bookings.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
