import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types";

export async function getCourses(): Promise<Course[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[Supabase] getCourses error:", error.message);
    throw new Error("Failed to load courses");
  }

  return data ?? [];
}
