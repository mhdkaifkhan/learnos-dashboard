"use client";
// Client Component — needed for Framer Motion animations

import { motion } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
}

// Stagger container — children animate in sequentially
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 gap-3.5 flex-1 md:grid-cols-2 lg:grid-cols-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

// Reusable tile motion wrapper — used by every Bento tile
// Uses transform + opacity ONLY (no layout shifts)
export const tileVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

// Hover spring config — same spec as required
export const hoverSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};
