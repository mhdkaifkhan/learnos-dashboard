// app/dashboard/loading.tsx
// Next.js automatically shows this while the page Server Component streams in

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-bg-0">
      {/* Sidebar skeleton */}
      <div className="hidden h-screen w-16 min-w-16 overflow-hidden bg-bg-1 border-r border-border p-3 md:flex lg:w-[220px] lg:min-w-[220px] lg:p-5 flex-col gap-4">
        <div className="skeleton h-9 w-32 rounded-lg" />
        <div className="flex flex-col gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-10 w-full rounded-xl" />
          ))}
        </div>
        <div className="mt-auto skeleton h-12 w-full rounded-xl" />
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 p-4 pb-24 sm:p-6 md:pb-6 flex flex-col gap-5">
        {/* TopBar skeleton */}
        <div className="flex items-center justify-between">
          <div className="skeleton h-7 w-36 rounded-lg" />
          <div className="skeleton h-9 w-48 rounded-xl" />
        </div>

        {/* Bento grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 flex-1">
          <div className="skeleton col-span-1 md:col-span-2 lg:col-span-8 lg:row-span-2 rounded-2xl" style={{ minHeight: "220px" }} />
          <div className="skeleton col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-2 rounded-2xl" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton col-span-1 lg:col-span-3 h-36 rounded-2xl" />
          ))}
          <div className="skeleton col-span-1 md:col-span-2 lg:col-span-12 h-52 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
