// app/dashboard/page.tsx
// This is a React Server Component (RSC)
// Data fetching happens on the server — no useEffect, no client fetch

import { Suspense } from "react";
import { getCourses } from "@/lib/data";
import { MobileNav, Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { StreakTile } from "@/components/dashboard/StreakTile";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { CourseCardSkeleton } from "@/components/dashboard/CourseCardSkeleton";
import { BentoGrid } from "@/components/dashboard/BentoGrid";

// Isolated async component — wrapped in Suspense below
// This is what triggers the skeleton while DB call is in-flight
async function CourseTiles() {
  const courses = await getCourses();

  return (
    <>
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-0">
      {/* ─── SIDEBAR (Client Component for collapse state) ─── */}
      <Sidebar />

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="min-h-full p-4 pb-24 flex flex-col gap-5 sm:p-6 sm:pb-24 md:pb-6">
          <TopBar />

          {/* ─── BENTO GRID ─── */}
          <BentoGrid>
            {/* Hero — always rendered, no async */}
            <HeroTile />

            {/* Streak — always rendered */}
            <StreakTile />

            {/* Course tiles — async, wrapped in Suspense */}
            <Suspense
              fallback={
                <>
                  <CourseCardSkeleton />
                  <CourseCardSkeleton />
                  <CourseCardSkeleton />
                  <CourseCardSkeleton />
                </>
              }
            >
              <CourseTiles />
            </Suspense>

            {/* Activity tile — always rendered */}
            <ActivityTile />
          </BentoGrid>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
