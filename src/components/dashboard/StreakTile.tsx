"use client";

import { motion } from "framer-motion";
import { tileVariants, hoverSpring } from "./BentoGrid";

// 21 dots = 3 weeks
// 1 = completed, 0.5 = partial, 0 = missed
const STREAK_DOTS: (0 | 0.5 | 1)[] = [
  1, 1, 1, 1, 1, 0, 1,
  1, 1, 0, 1, 1, 1, 1,
  0.5, 1, 1, 1, 1, 0.5, 1,
];

const WEEK_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export function StreakTile() {
  return (
    <motion.article
      variants={tileVariants}
      className="col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-2 relative bg-bg-1 border border-border rounded-2xl p-5 overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.012, y: -2, transition: hoverSpring }}
    >
      <div className="grain-overlay absolute inset-0 rounded-2xl" />

      {/* Amber glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.1), transparent 60%)" }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-semibold tracking-widest text-text-3 uppercase">
            Daily Streak
          </span>
          <span className="text-[11px] font-bold rounded-full px-2.5 py-1 border"
            style={{
              background: "rgba(245,158,11,0.1)",
              borderColor: "rgba(245,158,11,0.2)",
              color: "#f59e0b",
            }}>
            🔥 Active
          </span>
        </div>

        {/* Big number */}
        <div className="font-display font-extrabold text-[52px] leading-none" style={{ color: "#f59e0b" }}>
          14
        </div>
        <div className="text-[12px] text-text-3 mb-4">days in a row</div>

        {/* Dot grid */}
        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {STREAK_DOTS.map((val, i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-[4px]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.3 + i * 0.025,
              }}
              style={{
                background:
                  val === 1
                    ? "#f59e0b"
                    : val === 0.5
                    ? "rgba(245,158,11,0.3)"
                    : "var(--bg-3)",
                boxShadow: val === 1 ? "0 0 8px rgba(245,158,11,0.4)" : "none",
              }}
            />
          ))}
        </div>

        {/* Week labels */}
        <div className="grid grid-cols-7 gap-1.5">
          {WEEK_LABELS.map((d, i) => (
            <div key={`${d}-${i}`} className="text-[9px] text-text-3 text-center font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Decorative fire emoji */}
        <div className="absolute right-4 bottom-4 text-[34px] opacity-30 pointer-events-none select-none">
          🔥
        </div>
      </div>
    </motion.article>
  );
}
