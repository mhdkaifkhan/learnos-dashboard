"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { tileVariants, hoverSpring } from "./BentoGrid";

// Generate mock contribution data (6 months = ~182 days)
function generateActivityData(): number[] {
  // Seeded so it looks consistent across renders
  const data: number[] = [];
  for (let i = 0; i < 182; i++) {
    const r = Math.sin(i * 137.508) * 0.5 + 0.5; // deterministic pseudo-random
    const level = r < 0.38 ? 0 : r < 0.58 ? 1 : r < 0.74 ? 2 : r < 0.87 ? 3 : 4;
    data.push(level);
  }
  return data;
}

const CELL_COLORS = [
  "var(--bg-3)",
  "rgba(20,184,166,0.20)",
  "rgba(20,184,166,0.45)",
  "rgba(20,184,166,0.70)",
  "rgba(20,184,166,0.90)",
];

const CELL_SHADOWS = [
  "none",
  "none",
  "none",
  "none",
  "0 0 4px rgba(20,184,166,0.4)",
];

export function ActivityTile() {
  const activityData = useMemo(generateActivityData, []);

  return (
    <motion.article
      variants={tileVariants}
      className="col-span-1 md:col-span-2 lg:col-span-9 relative bg-bg-1 border border-border rounded-2xl p-5 overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.006, y: -2, transition: hoverSpring }}
    >
      <div className="grain-overlay absolute inset-0 rounded-2xl" />

      {/* Teal glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(20,184,166,0.08), transparent 60%)" }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-semibold tracking-widest text-text-3 uppercase">
            Learning Activity
          </span>
          <span className="text-[12px] text-text-3">Last 6 months</span>
        </div>

        {/* Contribution grid — 26 cols × 7 rows */}
        <div className="overflow-x-auto pb-1">
          <div
            className="grid min-w-[520px] gap-[3px]"
            style={{ gridTemplateColumns: "repeat(26, 1fr)" }}
          >
            {activityData.map((level, i) => (
              <div
                key={i}
                className="aspect-square rounded-[2px]"
                style={{
                  background: CELL_COLORS[level],
                  boxShadow: CELL_SHADOWS[level],
                }}
                title={`${level > 0 ? level + " session" + (level > 1 ? "s" : "") : "No activity"}`}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-2 justify-end">
          <span className="text-[10px] text-text-3">Less</span>
          {CELL_COLORS.map((color, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ background: color, boxShadow: CELL_SHADOWS[i] }}
            />
          ))}
          <span className="text-[10px] text-text-3">More</span>
        </div>
      </div>
    </motion.article>
  );
}
