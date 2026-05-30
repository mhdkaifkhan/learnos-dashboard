import { Bell, Calendar, Search } from "lucide-react";

export function TopBar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="font-display font-bold text-[18px] text-text-1">Dashboard</h1>
        <p className="text-[12.5px] text-text-3 mt-0.5">{today}</p>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="hidden md:flex items-center gap-2 bg-bg-2 border border-border rounded-xl px-3 py-[7px] text-text-3 text-[13px] w-48 cursor-pointer hover:border-border-2 hover:text-text-2 transition-colors">
          <Search size={14} strokeWidth={2} />
          <span>Search courses…</span>
        </div>

        <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-bg-2 border border-border text-text-2 hover:bg-bg-3 hover:text-text-1 transition-colors cursor-pointer">
          <Bell size={17} strokeWidth={1.8} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent-blue border-[1.5px] border-bg-2" />
        </div>

        <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-bg-2 border border-border text-text-2 hover:bg-bg-3 hover:text-text-1 transition-colors cursor-pointer">
          <Calendar size={17} strokeWidth={1.8} />
        </div>
      </div>
    </header>
  );
}
