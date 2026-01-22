"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin } from "lucide-react";

interface Props {
  name: string;
  role: string;
  image: string;
}

export default function TeamCard({ name, role, image }: Props) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="relative rounded-3xl overflow-hidden bg-white shadow-md group"
    >
      {/* IMAGE */}
      <div className="relative h-[340px] w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* HOVER OVERLAY */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/45 flex items-center justify-center gap-4"
      >
        <SocialIcon icon={<Facebook size={18} />} />
        <SocialIcon icon={<Twitter size={18} />} />
        <SocialIcon icon={<Linkedin size={18} />} />
      </motion.div>

      {/* NAME BADGE */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="rounded-2xl bg-white/90 backdrop-blur-md px-4 py-3 shadow-lg text-center">
          <h3 className="font-semibold text-lg leading-tight">
            {name}
          </h3>
          <p className="text-sm text-gray-600">
            {role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center cursor-pointer"
    >
      {icon}
    </motion.div>
  );
}
