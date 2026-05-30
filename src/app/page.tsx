import { redirect } from "next/navigation";

// Root redirects straight to the dashboard
export default function HomePage() {
  redirect("/dashboard");
}
