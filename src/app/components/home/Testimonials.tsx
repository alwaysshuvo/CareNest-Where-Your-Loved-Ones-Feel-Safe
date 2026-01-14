"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Nusrat Jahan",
    role: "Mother of a 2-year-old",
    image:
      "https://i.ibb.co/mrNNq2PL/Locker-Modern-Selbstbewusst-sympathisch-und-professionell-dein-Bewerbungsfoto-sollte-dich.jpg",
    rating: 5,
    message:
      "CareNest made it so easy to find a trustworthy babysitter. The caregiver was kind, professional, and very caring with my child.",
  },
  {
    name: "Abdul Karim",
    role: "Elderly Care Client",
    image: "https://i.ibb.co/zHQLnXnx/download-4.jpg",
    rating: 5,
    message:
      "Finding reliable elderly care was a challenge until I discovered CareNest. The whole process was smooth and stress-free.",
  },
  {
    name: "Sadia Rahman",
    role: "Home Care User",
    image:
      "https://i.ibb.co/1C697X1/Professional-Headshots-Orlando.jpg",
    rating: 4,
    message:
      "I booked sick care service for my mother. Booking was simple and the support team was very responsive throughout.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-purple-600 mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Loved by Families Across Bangladesh
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Real stories from families who trusted CareNest for their loved ones.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                “{item.message}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4 border-t pt-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
