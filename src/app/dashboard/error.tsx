"use client";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-0 p-6 text-text-1">
      <section className="w-full max-w-md rounded-2xl border border-border bg-bg-1 p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-coral">
          Connection error
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold">
          Courses could not be loaded
        </h1>
        <p className="mt-2 text-sm text-text-2">
          Check the Supabase connection and try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 rounded-xl bg-accent-blue px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
