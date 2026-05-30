export function CourseCardSkeleton() {
  return (
    <div className="col-span-1 relative bg-bg-1 border border-border rounded-2xl p-5 overflow-hidden">
      <div className="flex items-start gap-3 mb-4">
        <div className="skeleton w-[38px] h-[38px] min-w-[38px] rounded-[10px]" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="skeleton h-3.5 w-3/4 rounded" />
          <div className="skeleton h-2.5 w-1/2 rounded" />
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <div className="skeleton h-2.5 w-12 rounded" />
          <div className="skeleton h-3 w-8 rounded" />
        </div>
        <div className="skeleton h-[5px] w-full rounded-full" />
      </div>
    </div>
  );
}
