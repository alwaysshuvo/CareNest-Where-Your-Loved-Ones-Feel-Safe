"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BookingCard from "@/components/booking/BookingCard";

export default function MyBookingsPage() {
  const { status } = useSession();
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Private route
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // 📦 Load bookings
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/bookings")
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        });
    }
  }, [status]);

  // ✅ update booking after cancel
  const handleCancelSuccess = (updatedBooking: any) => {
    setBookings((prev) =>
      prev.map((b) =>
        b._id === updatedBooking._id ? updatedBooking : b
      )
    );
  };

  if (loading) return <p className="p-10">Loading bookings...</p>;

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancelSuccess={handleCancelSuccess}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
