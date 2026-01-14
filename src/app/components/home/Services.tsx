"use client";

import { Baby, HeartPulse, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm font-medium text-purple-600">
            Our Services
          </p>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Reliable Care for Every Need
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We provide trusted and verified caregivers to support your
            family members with love, safety, and professionalism.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <ServiceCard
            title="Baby Care"
            description="Professional babysitters to take care of your child with love, safety, and attention."
            icon={<Baby size={24} />}
            href="/services/baby-care"
          />

          <ServiceCard
            title="Elderly Care"
            description="Compassionate caregivers to support elderly family members with daily care and comfort."
            icon={<UserRound size={24} />}
            href="/services/elderly-care"
          />

          <ServiceCard
            title="Sick Care"
            description="Dedicated care services for sick or recovering patients at home with medical attention."
            icon={<HeartPulse size={24} />}
            href="/services/sick-care"
          />
        </motion.div>
      </div>
    </section>
  );
}
