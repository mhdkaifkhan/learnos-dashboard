# LearnOS Dashboard

A responsive student dashboard built with Next.js, Supabase, Tailwind CSS, and Framer Motion.

## Demo

[Live dashboard](https://learnos-dashboard-kohl.vercel.app/dashboard)

## Overview

The dashboard includes a collapsible sidebar, course progress cards, a streak view, and a six-month activity chart. Course cards are loaded from Supabase; the remaining dashboard stats are sample values for the prototype.

The `/dashboard` page is a Server Component. It fetches courses through `src/lib/data.ts` and renders the results inside a Suspense boundary. The course cards stay client-side because their progress bars and hover states are animated. Database failures are handled by `src/app/dashboard/error.tsx`.

The layout changes at smaller breakpoints:

- Desktop uses the full sidebar and 12-column grid.
- Tablet uses an icon-only sidebar and 2-column grid.
- Mobile switches to bottom navigation and a single-column layout.

## Local Setup

Install dependencies:

```bash
npm install
```

Create `.env.local` from `.env.example` and add the Supabase project URL and publishable key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Create and seed the courses table in Supabase:

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

Start the development server:

```bash
npm run dev
```

## Notes

- Lucide icons are selected from each course row's `icon_name`. Invalid names fall back to a book icon.
- Tile entrances use a staggered Framer Motion animation.
- Hover states and progress fills use transforms to avoid layout shifts.
