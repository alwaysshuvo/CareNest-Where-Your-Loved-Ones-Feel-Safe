"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BookingCard from "@/components/booking/BookingCard";
import Swal from "sweetalert2";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch bookings (only when authenticated)
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings", {
          credentials: "include", // 🔑 VERY IMPORTANT
        });

        if (!res.ok) {
          setBookings([]);
          return;
        }

        const data = await res.json();

        // safety check
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch bookings error:", error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [status]);

  // 🔹 Cancel booking
  const handleCancel = async (id: string) => {
    const { value: reason } = await Swal.fire({
      title: "Cancel booking?",
      input: "select",
      inputOptions: {
        "Too expensive": "Too expensive",
        "Taking too long": "Taking too long",
        "Booked by mistake": "Booked by mistake",
        Other: "Other",
      },
      inputPlaceholder: "Select a reason",
      showCancelButton: true,
    });

    if (!reason) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      const data = await res.json();

      if (data.deletedCount > 0) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
        Swal.fire("Cancelled", "Your booking has been cancelled", "success");
      } else {
        Swal.fire("Error", "Booking not found or not authorized", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong. Try again.", "error");
    }
  };

  // 🔒 If not logged in
  if (status === "unauthenticated") {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please login to view your bookings</p>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Booked Services</h1>
          <p className="text-gray-500 mt-1">
            Here is all your booked services
          </p>
        </div>

        {/* STATES */}
        {loading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <div className="rounded-xl bg-white py-20 text-center">
            <p className="text-gray-600">You have no bookings yet</p>
          </div>
        ) : (
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
