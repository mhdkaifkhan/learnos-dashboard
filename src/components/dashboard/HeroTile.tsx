"use client";
// HeroTile — Client Component for animated counters

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { tileVariants, hoverSpring } from "./BentoGrid";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  target: number;
}

const STATS: Stat[] = [
  { label: "Hours Today",     value: 0, suffix: "h",  target: 3    },
  { label: "Active Courses",  value: 0, suffix: "",   target: 4    },
  { label: "XP Earned",       value: 0, suffix: "",   target: 1240 },
  { label: "Leaderboard",     value: 0, suffix: "",   target: 12   },
];

export function HeroTile() {
  const [stats, setStats] = useState(STATS.map((s) => ({ ...s, current: 0 })));

  // Animate counts on mount
  useEffect(() => {
    const timers: ReturnType<typeof setInterval>[] = [];

    STATS.forEach((stat, i) => {
      const steps = 60;
      const inc = stat.target / steps;
      let current = 0;
      let step = 0;

      const t = setInterval(() => {
        step++;
        current = Math.min(current + inc, stat.target);
        setStats((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], current: Math.round(current) };
          return next;
        });
        if (step >= steps) clearInterval(t);
      }, 800 / steps);

      timers.push(t);
    });

    return () => timers.forEach(clearInterval);
  }, []);

  return (
    <motion.article
      variants={tileVariants}
      className="col-span-1 md:col-span-2 lg:col-span-8 lg:row-span-2 relative bg-bg-1 border border-border rounded-2xl p-5 overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.012, y: -2, transition: hoverSpring }}
    >
      {/* Grain texture */}
      <div className="grain-overlay absolute inset-0 rounded-2xl" />

      {/* Glow orbs — opacity only, no layout effect */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 280, height: 280,
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          right: -60, top: -80,
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 180, height: 180,
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          right: 60, bottom: -60,
        }}
      />

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.08), transparent 60%)" }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <h2 className="font-display font-extrabold text-[28px] leading-tight mb-1.5">
            Welcome back,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mohmmad Kaif 👋
            </span>
          </h2>
          <p className="text-[13.5px] text-text-2">
            You&apos;re on a roll! Keep up your learning momentum today.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 flex-wrap mt-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-bg-2 border border-border rounded-xl px-4 py-3 flex flex-col gap-0.5"
            >
              <span className="font-display font-bold text-[22px] text-text-1">
                {i === 3 ? "#" : ""}{stat.current}{stat.suffix}
              </span>
              <span className="text-[11px] text-text-3 font-medium uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
