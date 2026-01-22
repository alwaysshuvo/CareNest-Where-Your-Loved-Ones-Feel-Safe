"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  ShieldCheck,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="relative rounded-[32px] bg-gradient-to-br from-purple-100 via-indigo-100 to-sky-100 p-12 md:p-20 text-center shadow-sm"
        >
          <div className="absolute inset-0 rounded-[32px] backdrop-blur-[2px]" />

          <div className="relative z-10">
            <p className="text-sm font-semibold text-purple-600 mb-3">
              About CareNest
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Your Home, Our <br />
              <span className="text-purple-600">Heartfelt Care</span>
            </h1>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
              Compassionate, reliable, and professional home care services —
              designed to support families with trust and dignity.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-semibold text-purple-600 mb-2">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Keeping Loved Ones <br /> Close & Comfortable
          </h2>
          <p className="text-gray-600 mb-8">
            CareNest believes true care goes beyond tasks — it’s about human
            connection. We empower families with trusted caregivers who treat
            every home like their own.
          </p>

          <ul className="space-y-4 text-gray-700">
            {[
              "Verified & trained caregivers",
              "Flexible scheduling & fair pricing",
              "Care for children, elderly & special needs",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-purple-600">●</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* IMAGE + FLOATING CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <Image
            src="/assets/about-care.png"
            alt="Care service"
            width={520}
            height={420}
            className="rounded-3xl object-cover shadow-xl"
          />

          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl px-6 py-4 shadow-lg">
            <p className="text-3xl font-bold text-purple-600">5k+</p>
            <p className="text-sm text-gray-600">Families Served</p>
          </div>
        </motion.div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            What Makes CareNest Different
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                icon: HeartHandshake,
                title: "Compassion",
                text: "Care delivered with empathy and heart.",
              },
              {
                icon: ShieldCheck,
                title: "Safety First",
                text: "Strict verification and secure processes.",
              },
              {
                icon: Users,
                title: "Expert Team",
                text: "Professionally trained caregivers.",
              },
              {
                icon: Star,
                title: "Quality Care",
                text: "Consistent and dependable service.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <item.icon
                  className="mx-auto text-purple-600 mb-5"
                  size={38}
                />
                <h3 className="font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          ["5k+", "Happy Families"],
          ["1k+", "Verified Caregivers"],
          ["24/7", "Support"],
          ["98%", "Satisfaction Rate"],
        ].map(([value, label], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-4xl font-bold text-purple-600">{value}</p>
            <p className="text-gray-600 mt-2">{label}</p>
          </motion.div>
        ))}
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Trusted Home Care?
          </h2>
          <p className="opacity-90 mb-8">
            Join thousands of families who rely on CareNest every day.
          </p>

          <button className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Get Started <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>
    </main>
  );
}
