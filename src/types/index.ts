// Types matching Supabase courses table schema exactly

export interface Course {
  id: string;           // uuid primary key
  title: string;        // e.g. "Advanced React Patterns"
  progress: number;     // integer 0-100
  icon_name: string;    // Lucide icon name e.g. "Star", "BarChart2"
  created_at: string;   // ISO timestamp
}

export interface CourseWithColor extends Course {
  color: string;        // injected client-side based on index
  gradientFrom: string;
  gradientTo: string;
}

export interface DashboardStats {
  hoursToday: number;
  activeCourses: number;
  xpEarned: number;
  leaderboardRank: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;         // Lucide icon name
  badge?: number;
}

export interface StreakData {
  currentStreak: number;
  weeklyDots: (0 | 0.5 | 1)[];
}
