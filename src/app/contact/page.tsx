"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function ContactPage() {
  return (
    <main className="bg-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="rounded-[32px] bg-gradient-to-br from-purple-100 via-indigo-100 to-sky-100 px-10 py-16 md:px-20 md:py-24 text-center shadow-sm"
        >
          <p className="text-sm font-semibold text-purple-600 mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Message <br />
            <span className="text-purple-600">
              Means a Lot to Us
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg">
            Whether you have a question, need help, or want to book care —
            our team is here to listen and support you.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT INFO */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl bg-gradient-to-br from-indigo-100 via-purple-100 to-sky-100 p-10 shadow-sm"
          >
            <h2 className="text-3xl font-bold mb-4">
              Get In Touch With CareNest
            </h2>
            <p className="text-gray-600 mb-10">
              Our support team is always ready to help you with care services,
              bookings, or general inquiries.
            </p>

            <div className="space-y-6">
              <InfoItem
                icon={<Phone />}
                title="Phone"
                text="+880 1234-567890"
              />
              <InfoItem
                icon={<Mail />}
                title="Email"
                text="support@carenest.com"
              />
              <InfoItem
                icon={<MapPin />}
                title="Location"
                text="Dhaka, Bangladesh"
              />
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-white rounded-3xl p-10 shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Input label="First Name" placeholder="Enter first name" />
              <Input label="Last Name" placeholder="Enter last name" />
            </div>

            <div className="space-y-6">
              <Input
                label="Email"
                placeholder="Enter your email address"
                type="email"
              />
              <Input
                label="Mobile Number"
                placeholder="Enter your mobile number"
              />
              <Input
                label="Subject"
                placeholder="Enter subject"
              />
              <Textarea
                label="Message"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-purple-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition"
            >
              Send Message <Send size={18} />
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}

/* ================= SUB COMPONENTS ================= */

function InfoItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-purple-600 shadow">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-600 text-sm">{text}</p>
      </div>
    </div>
  );
}

function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

function Textarea({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
      />
    </div>
  );
}
