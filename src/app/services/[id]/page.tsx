import { services } from "@/data/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import BookingSection from "./BookingSection";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ServiceDetails({ params }: PageProps) {
  const { id } = await params; // ✅ MUST

  const service = services.find((s) => s.id === id);

  if (!service) notFound();

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <Image
        src={service.image}
        alt={service.title}
        width={800}
        height={400}
        className="rounded-2xl mb-8"
      />

      <h1 className="text-3xl font-bold">{service.title}</h1>
      <p className="mt-4 text-gray-600">{service.details}</p>

      <p className="mt-6 text-lg font-semibold text-purple-600">
        ৳{service.price} / day
      </p>

      {/* ✅ Client Component */}
      <BookingSection service={service} />
    </section>
  );
}
