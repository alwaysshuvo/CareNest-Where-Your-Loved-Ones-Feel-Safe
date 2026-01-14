"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 6, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition"
      >
        {icon}
      </motion.div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mb-4 text-sm text-gray-600 leading-relaxed">
        {description}
      </p>

      {/* CTA */}
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 group-hover:text-purple-700"
      >
        Explore Service
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 6 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight size={16} />
        </motion.span>
      </Link>
    </motion.div>
  );
}
