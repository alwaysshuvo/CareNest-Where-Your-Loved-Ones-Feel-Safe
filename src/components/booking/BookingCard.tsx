"use client";

import Image from "next/image";
import { useState } from "react";
import CancelBookingModal from "./CancelBookingModal";

export default function BookingCard({
  booking,
  onCancel,
}: {
  booking: any;
  onCancel: (id: string, reason: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl bg-white shadow hover:shadow-xl transition overflow-hidden">
        {/* IMAGE */}
        <div className="relative h-40">
          <Image
            src={booking.image || "/assets/services/default.jpg"}
            alt={booking.serviceTitle}
            fill
            className="object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-5">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">
              {booking.serviceTitle}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                booking.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : booking.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {booking.status}
            </span>
          </div>

          <p className="mt-2 text-purple-600 font-semibold">
            ৳{booking.price} / day
          </p>

          <p className="mt-1 text-sm text-gray-500">
            📅 {booking.date}
          </p>

          {/* ACTIONS */}
          <div className="mt-5 flex gap-3">
            <button className="flex-1 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
              View Details
            </button>

            {booking.status !== "cancelled" && (
              <button
                onClick={() => setOpen(true)}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <CancelBookingModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={(reason) => {
          onCancel(booking._id, reason);
          setOpen(false);
        }}
      />
    </>
  );
}
