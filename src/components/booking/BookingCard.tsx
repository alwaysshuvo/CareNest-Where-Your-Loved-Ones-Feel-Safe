import Image from "next/image";
import Link from "next/link";

export default function BookingCard({ booking, onCancel }: any) {
  return (
    <div className="rounded-2xl bg-white shadow hover:shadow-lg transition overflow-hidden">
      
      {/* IMAGE */}
      <div className="relative h-44 w-full">
        <Image
          src={booking.serviceImage || "/assets/services/default.jpg"}
          alt={booking.serviceTitle}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">
            {booking.serviceTitle}
          </h3>
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs">
            {booking.status}
          </span>
        </div>

        <p className="text-purple-600 mt-1">
          ৳{booking.price} / day
        </p>

        <p className="text-sm text-gray-500 mt-1">
          📅 {booking.date}
        </p>

        {/* ACTIONS */}
        <div className="mt-4 flex gap-3">
          <Link
            href={`/services/${booking.serviceId}`}
            className="flex-1 rounded-lg border py-2 text-center text-sm hover:bg-gray-50"
          >
            View Details
          </Link>

          <button
            onClick={() => onCancel(booking._id)}
            className="flex-1 rounded-lg bg-red-500 text-white py-2 text-sm hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
