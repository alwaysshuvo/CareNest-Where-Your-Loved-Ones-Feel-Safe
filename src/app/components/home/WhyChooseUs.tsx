"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  CalendarCheck,
  HeartHandshake,
  Headset,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Caregivers",
    description:
      "All our caregivers are background-checked and verified to ensure safety and trust for your loved ones.",
  },
  {
    icon: CalendarCheck,
    title: "Easy & Secure Booking",
    description:
      "Book care services in just a few steps with secure authentication and transparent pricing.",
  },
  {
    icon: HeartHandshake,
    title: "Flexible Care Services",
    description:
      "Choose services based on your needs — baby care, elderly care, or special home care.",
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    description:
      "Our support team is always available to help you with bookings, questions, or emergencies.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium text-purple-600 mb-2">
            Why Choose CareNest
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trusted Care You Can Rely On
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            We are committed to making caregiving simple, secure, and accessible
            for every family.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl border bg-gray-50 p-6 text-center hover:shadow-lg transition"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
