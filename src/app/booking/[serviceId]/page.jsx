import { services } from "@/data/services";
import { notFound } from "next/navigation";
import BookingForm from "@/components/booking/BookingForm";


export default async function BookingPage({ params }) {
  // ✅ params Promise fix
  const { serviceId } = await params;

  const service = services.find((s) => s.id === serviceId);
  if (!service) return notFound();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Book: {service.title}
        </h1>

        <p className="text-gray-600 mt-2">{service.shortDesc}</p>

        <p className="mt-4 text-xl font-semibold text-purple-600">
          ৳{service.price} / day
        </p>

        <BookingForm service={service} />

      </div>
    </section>
  );
}
