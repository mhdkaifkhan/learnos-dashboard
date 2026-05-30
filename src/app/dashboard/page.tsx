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
      <Sidebar />

      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="min-h-full p-4 pb-24 flex flex-col gap-5 sm:p-6 sm:pb-24 md:pb-6">
          <TopBar />

          <BentoGrid>
            <HeroTile />
            <StreakTile />

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

            <ActivityTile />
          </BentoGrid>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
