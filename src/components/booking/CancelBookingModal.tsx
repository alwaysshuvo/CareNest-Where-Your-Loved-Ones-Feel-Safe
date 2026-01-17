"use client";

import { useState } from "react";

const reasons = [
  "Taking too long",
  "Too expensive",
  "Found another service",
  "No longer needed",
  "Other",
];

export default function CancelBookingModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h2 className="text-lg font-semibold mb-4">
          Cancel Booking
        </h2>

        <div className="space-y-2">
          {reasons.map((r) => (
            <label
              key={r}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="reason"
                value={r}
                onChange={() => setReason(r)}
              />
              {r}
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Close
          </button>

          <button
            disabled={!reason}
            onClick={() => onConfirm(reason)}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
