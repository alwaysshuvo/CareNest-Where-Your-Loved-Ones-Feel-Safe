import { services } from "@/data/services";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ params fix (Next.js 15+)
  const { id } = await params;

  const service = services.find((s) => s.id === id);
  if (!service) return notFound();

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* CONTENT */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {service.title}
          </h1>

          <p className="mt-3 text-gray-600">
            {service.shortDesc}
          </p>

          <p className="mt-5 text-2xl font-semibold text-purple-600">
            ৳{service.price} <span className="text-sm">/ day</span>
          </p>

          <ul className="mt-5 space-y-2 text-sm text-gray-600">
            <li>✔ Trained & verified caregiver</li>
            <li>✔ Flexible timing</li>
            <li>✔ Safe & reliable service</li>
          </ul>

          <Link
            href={`/booking/${service.id}`}
            className="mt-8 inline-block rounded-xl bg-purple-600 px-8 py-3 text-white font-semibold hover:bg-purple-700 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
