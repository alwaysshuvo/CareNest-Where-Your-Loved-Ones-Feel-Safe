"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
      
      {/* Background blur shapes */}
      <motion.div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-200 opacity-30 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 -right-24 h-96 w-96 rounded-full bg-blue-200 opacity-30 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <div>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700"
          >
            💜 Trusted Home Care Platform
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mt-6 text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            Caring Made Easy <br />
            for Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Loved Ones
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="mt-6 text-lg text-gray-600 max-w-xl"
          >
            CareNest helps families find verified caregivers for babysitting,
            elderly care, and special home care.  
            Book trusted services easily based on time and location.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/services"
              className="rounded-xl bg-purple-600 px-8 py-4 text-white font-semibold shadow-lg hover:bg-purple-700 hover:shadow-xl transition"
            >
              Explore Services
            </Link>

            <Link
              href="/my-bookings"
              className="rounded-xl border border-purple-600 px-8 py-4 text-purple-600 font-semibold hover:bg-purple-50 transition"
            >
              My Bookings
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="mt-14 grid grid-cols-3 max-w-md gap-6 text-center"
          >
            {[
              { value: "500+", label: "Happy Families" },
              { value: "100%", label: "Verified Caregivers" },
              { value: "24/7", label: "Support" },
            ].map((item) => (
              <div key={item.label}>
                <h3 className="text-2xl font-bold text-gray-900">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="relative rounded-3xl bg-white/60 backdrop-blur-xl p-8 shadow-2xl">
            <Image
              src="https://i.ibb.co/q4fpQWM/Hero-Img.png"
              alt="Care Services Illustration"
              width={520}
              height={520}
              priority
              className="object-contain"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
