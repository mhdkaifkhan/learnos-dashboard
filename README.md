# LearnOS - Next-Gen Learning Dashboard

A responsive student dashboard built with Next.js App Router, Supabase, Tailwind CSS, Framer Motion, Lucide React, and TypeScript.

## Live Demo

Add the production Vercel URL here after deployment.

## Architecture

`src/app/dashboard/page.tsx` is a React Server Component. Its nested async `CourseTiles` component fetches courses from Supabase through `src/lib/data.ts`, then passes each database row to the client-side `CourseCard` component for animation.

This keeps database fetching on the server while preserving interactive motion in the browser. A Suspense boundary shows pulsing skeleton cards while course data loads. `src/app/dashboard/error.tsx` provides a route-level retry state if the database connection fails.

## Responsive Layout

- Desktop: full sidebar and a 12-column Bento grid.
- Tablet: icon-only sidebar and a 2-column Bento grid.
- Mobile: fixed bottom navigation and a single-column scrolling layout.

## Animation Strategy

Framer Motion handles staggered tile entrances, spring-based hover elevation, and `layoutId` navigation highlights. Entrance, hover, and progress animations use transform and opacity to avoid layout shifts. Course progress bars animate from zero to the fetched database value with `scaleX`.

## Supabase Setup

Create a Supabase project and run:

```sql
create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null,
  created_at timestamptz default now()
);

insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Star'),
  ('TypeScript Deep Dive',    48, 'BarChart2'),
  ('Next.js App Router',      30, 'LayoutDashboard'),
  ('Framer Motion Mastery',   90, 'Globe');

alter table public.courses enable row level security;
create policy "Allow public read" on public.courses for select using (true);
```

Copy `.env.example` to `.env.local` and add the Supabase project values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Never commit `.env.local`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deployment

Push the project to a public GitHub repository, import it into Vercel, and configure the same two Supabase environment variables in the Vercel dashboard.

## Challenges Addressed

- Lucide icons are resolved dynamically from each database row's `icon_name`, with a fallback icon for invalid names.
- Async Supabase loading is isolated behind a Suspense boundary with animated placeholders.
- Navigation adapts across desktop, tablet, and mobile layouts without layout-changing motion.
