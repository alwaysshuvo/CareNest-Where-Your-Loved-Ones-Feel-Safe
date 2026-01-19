"use client";

import Image from "next/image";
import Swal from "sweetalert2";

type BookingCardProps = {
  booking: any;
  onCancelSuccess: (updatedBooking: any) => void;
};

export default function BookingCard({
  booking,
  onCancelSuccess,
}: BookingCardProps) {

  const handleCancel = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Cancel Booking",
      html: `
        <select id="reason" class="swal2-select">
          <option value="">Select a reason</option>
          <option value="Too expensive">Too expensive</option>
          <option value="Service delayed">Service delayed</option>
          <option value="Change of plan">Change of plan</option>
          <option value="Found better service">Found better service</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          id="customReason"
          class="swal2-textarea"
          placeholder="Write your reason (if Other selected)"
          style="display:none"
        ></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Confirm Cancel",

      didOpen: () => {
        const reasonSelect =
          document.getElementById("reason") as HTMLSelectElement | null;
        const customReason =
          document.getElementById("customReason") as HTMLTextAreaElement | null;

        if (reasonSelect && customReason) {
          reasonSelect.addEventListener("change", (e) => {
            const target = e.target as HTMLSelectElement;

            if (target.value === "Other") {
              customReason.style.display = "block";
            } else {
              customReason.style.display = "none";
            }
          });
        }
      },

      preConfirm: () => {
        const reasonSelect =
          document.getElementById("reason") as HTMLSelectElement | null;
        const customReason =
          document.getElementById("customReason") as HTMLTextAreaElement | null;

        if (!reasonSelect) {
          Swal.showValidationMessage("Please select a reason");
          return;
        }

        const reason = reasonSelect.value;
        const customValue = customReason?.value || "";

        if (!reason) {
          Swal.showValidationMessage("Please select a reason");
          return;
        }

        if (reason === "Other" && !customValue.trim()) {
          Swal.showValidationMessage("Please write your reason");
          return;
        }

        return reason === "Other" ? customValue : reason;
      },
    });

    if (!formValues) return;

    const res = await fetch(`/api/bookings/${booking._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "cancelled",
        cancelReason: formValues,
      }),
    });

    if (res.ok) {
      const updatedBooking = await res.json();
      Swal.fire("Cancelled", "Your booking has been cancelled", "success");
      onCancelSuccess(updatedBooking);
    } else {
      Swal.fire("Error", "Failed to cancel booking", "error");
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow hover:shadow-lg transition overflow-hidden">
      {/* IMAGE */}
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={booking.serviceImage}
          alt={booking.serviceTitle}
          fill
          className="object-contain"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">
            {booking.serviceTitle}
          </h3>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              booking.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : booking.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {booking.status}
          </span>
        </div>

        <p className="text-purple-600 mt-1 font-semibold">
          ৳{booking.price} / day
        </p>

        <p className="text-sm text-gray-500 mt-1">
          📅 {new Date(booking.createdAt).toLocaleString()}
        </p>

        <div className="mt-4 flex gap-3">
          <button className="flex-1 rounded-lg border py-2 text-sm hover:bg-gray-50">
            View Details
          </button>

          {booking.status === "pending" && (
            <button
              onClick={handleCancel}
              className="flex-1 rounded-lg bg-red-500 text-white py-2 text-sm hover:bg-red-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
