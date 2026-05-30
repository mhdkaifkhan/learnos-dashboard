"use client";
// Client Component — manages collapse state and nav active state
// layoutId on the highlight enables Framer Motion layout animation

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Search,
  FileText,
  User,
  Settings,
  Layers,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} strokeWidth={1.8} /> },
  { id: "courses",   label: "Courses",   icon: <BookOpen size={17} strokeWidth={1.8} />, badge: 4 },
  { id: "explore",   label: "Explore",   icon: <Search size={17} strokeWidth={1.8} /> },
  { id: "assignments", label: "Assignments", icon: <FileText size={17} strokeWidth={1.8} />, badge: 2 },
];

const BOTTOM_ITEMS: NavItemConfig[] = [
  { id: "profile",  label: "Profile",  icon: <User size={17} strokeWidth={1.8} /> },
  { id: "settings", label: "Settings", icon: <Settings size={17} strokeWidth={1.8} /> },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <nav
      className={cn(
        "relative hidden h-screen w-16 flex-shrink-0 flex-col overflow-hidden border-r border-border bg-bg-1 md:flex",
        collapsed ? "lg:w-16" : "lg:w-[220px]"
      )}
    >
      {/* ─── HEADER ─── */}
      <div className="flex items-center justify-between p-4 pb-5 min-h-[64px]">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Logo icon */}
          <div className="w-8 h-8 min-w-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center flex-shrink-0">
            <Layers size={16} strokeWidth={2} color="white" />
          </div>

          {/* Logo text — fades out when collapsed */}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="hidden whitespace-nowrap font-display text-[15px] font-bold text-text-1 lg:block"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
              >
                LearnOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden h-7 w-7 min-w-7 flex-shrink-0 items-center justify-center rounded-md border border-border-2 bg-bg-2 text-text-2 transition-colors hover:bg-bg-3 hover:text-text-1 lg:flex"
          title="Toggle sidebar"
        >
          <motion.span
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronLeft size={13} />
          </motion.span>
        </button>
      </div>

      {/* ─── NAV SECTION ─── */}
      <div className="flex flex-col gap-0.5 px-3 flex-1">
        {/* Section label */}
        <AnimatePresence>
          {!collapsed && (
            <motion.p
              className="hidden px-2.5 mb-2 text-[10px] font-semibold uppercase tracking-widest text-text-3 lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Main
            </motion.p>
          )}
        </AnimatePresence>

        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={activeNav === item.id}
            collapsed={collapsed}
            onClick={() => setActiveNav(item.id)}
          />
        ))}

        <AnimatePresence>
          {!collapsed && (
            <motion.p
              className="hidden px-2.5 mb-2 mt-5 text-[10px] font-semibold uppercase tracking-widest text-text-3 lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Account
            </motion.p>
          )}
        </AnimatePresence>

        {BOTTOM_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={activeNav === item.id}
            collapsed={collapsed}
            onClick={() => setActiveNav(item.id)}
          />
        ))}
      </div>

      {/* ─── FOOTER / USER CARD ─── */}
      <div className="p-3 pt-4 border-t border-border mt-auto">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-bg-2 transition-colors cursor-pointer overflow-hidden">
          {/* Avatar */}
          <div className="w-[34px] h-[34px] min-w-[34px] rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-display font-bold text-[12px] flex-shrink-0">
            MK
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                className="hidden overflow-hidden lg:block"
              >
                <p className="text-[13px] font-semibold text-text-1 whitespace-nowrap">Mohmmad Kaif</p>
                <p className="text-[11px] text-text-3 whitespace-nowrap">Frontend Dev</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}

// ─── NAV ITEM ───
// layoutId="nav-highlight" makes the background slide between items
function NavItem({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItemConfig;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-3 px-2.5 py-2.5 rounded-xl w-full text-left transition-colors",
        active ? "text-text-1" : "text-text-2 hover:text-text-1"
      )}
    >
      {/* Animated background highlight — slides using layoutId */}
      {active && (
        <motion.div
          layoutId="nav-highlight"
          className="absolute inset-0 rounded-xl bg-bg-3 border border-border-2"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      {/* Icon */}
      <div
        className={cn(
          "relative w-8 h-8 min-w-8 flex items-center justify-center rounded-lg z-10",
          active ? "bg-accent-blue/10 text-accent-blue" : ""
        )}
      >
        {item.icon}
      </div>

      {/* Label */}
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            className="relative z-10 hidden flex-1 whitespace-nowrap text-[13.5px] font-medium lg:block"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Badge */}
      <AnimatePresence>
        {!collapsed && item.badge && (
          <motion.span
            className="relative z-10 hidden rounded-full bg-accent-blue px-2 py-0.5 text-[10px] font-bold text-white lg:inline"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {item.badge}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function MobileNav() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg-1/95 px-3 py-2 backdrop-blur md:hidden">
      <div className="grid grid-cols-4 gap-1">
        {NAV_ITEMS.map((item) => {
          const active = activeNav === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveNav(item.id)}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium",
                active ? "text-accent-blue" : "text-text-2"
              )}
            >
              {active && (
                <motion.div
                  layoutId="mobile-nav-highlight"
                  className="absolute inset-0 rounded-xl bg-bg-3"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
