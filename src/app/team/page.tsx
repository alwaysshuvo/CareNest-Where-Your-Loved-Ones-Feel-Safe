"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

import TeamHero from "@/components/team/TeamHero";
import TeamGrid from "@/components/team/TeamGrid";
import TeamValues from "@/components/team/TeamValues";
import TeamProcess from "@/components/team/TeamProcess";
import TeamCTA from "@/components/team/TeamCTA";

export default function TeamPage() {
  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <TeamHero />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <TeamGrid />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <TeamValues />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <TeamProcess />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <TeamCTA />
      </motion.div>
    </>
  );
}
