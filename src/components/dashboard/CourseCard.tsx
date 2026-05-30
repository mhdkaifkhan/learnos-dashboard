"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, icons, type LucideIcon } from "lucide-react";
import type { Course } from "@/types";
import { COURSE_COLORS } from "@/lib/course-colors";
import { tileVariants, hoverSpring } from "./BentoGrid";

interface CourseCardProps {
  course: Course;
  index: number;
}

function DynamicIcon({
  name,
  size = 20,
  color,
}: {
  name: string;
  size?: number;
  color: string;
}) {
  const IconComponent = (icons as Record<string, LucideIcon>)[name];

  if (!IconComponent) {
    return <BookOpen size={size} color={color} strokeWidth={1.8} />;
  }

  return <IconComponent size={size} color={color} strokeWidth={1.8} />;
}

const COL_SPANS = [
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-3",
];

export function CourseCard({ course, index }: CourseCardProps) {
  const colorConfig = COURSE_COLORS[index % COURSE_COLORS.length];
  const colSpan = COL_SPANS[index] ?? "lg:col-span-3";
  const [progressWidth, setProgressWidth] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const timeout = setTimeout(() => {
      setProgressWidth(course.progress);
    }, 600 + index * 100);

    return () => clearTimeout(timeout);
  }, [course.progress, index]);

  return (
    <motion.article
      variants={tileVariants}
      className={`col-span-1 ${colSpan} relative bg-bg-1 border border-border rounded-2xl p-5 overflow-hidden cursor-pointer flex flex-col`}
      whileHover={{ scale: 1.015, y: -2, transition: hoverSpring }}
    >
      <div className="grain-overlay absolute inset-0 rounded-2xl" />

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${colorConfig.glow}, transparent 70%)`,
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${colorConfig.glow}, transparent 60%)`,
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <header className="flex items-start gap-3 mb-4">
          <div
            className="w-[38px] h-[38px] min-w-[38px] rounded-[10px] flex items-center justify-center flex-shrink-0"
            style={{ background: colorConfig.iconBg }}
          >
            <DynamicIcon name={course.icon_name} color={colorConfig.color} />
          </div>
          <div>
            <h3 className="text-[13.5px] font-semibold text-text-1 leading-snug">
              {course.title}
            </h3>
            <p className="text-[11px] text-text-3 mt-0.5">Active course</p>
          </div>
        </header>

        <section className="mt-auto">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-text-3">Progress</span>
            <span
              className="font-display font-bold text-[13px]"
              style={{ color: colorConfig.color }}
            >
              {course.progress}%
            </span>
          </div>

          <div className="h-[5px] bg-bg-3 rounded-full overflow-hidden">
            <div
              className="h-full w-full origin-left rounded-full"
              style={{
                transform: `scaleX(${progressWidth / 100})`,
                background: `linear-gradient(90deg, ${colorConfig.gradientFrom}, ${colorConfig.gradientTo})`,
                transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
        </section>
      </div>
    </motion.article>
  );
}
