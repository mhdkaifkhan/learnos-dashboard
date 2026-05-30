// lib/data.ts
// All DB calls happen here — Server Components only

import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types";

// Fetch all courses from Supabase
// Called from Server Components — runs on server at request time
export async function getCourses(): Promise<Course[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    // Log on server, throw clean error for error boundary
    console.error("[Supabase] getCourses error:", error.message);
    throw new Error("Failed to load courses");
  }

  return data ?? [];
}
