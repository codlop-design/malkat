"use client";

import { LogOut } from "lucide-react";

type TabId = "profile" | "password" | "favourites" | "orders";

type Tab = {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

type ProfileSidebarProps = {
  tabs: Tab[];
  activeTab: TabId;
  onTabClick: (id: TabId) => void;
  onLogout: () => void;
};

export default function ProfileSidebar({
  tabs,
  activeTab,
  onTabClick,
  onLogout,
}: ProfileSidebarProps) {
  return (
    <aside className="rounded-2xl bg-white p-4 md:p-5">
      <nav className="space-y-3">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = id === activeTab;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabClick(id)}
              className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary text-white"
                  : "border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB]"
              }`}
            >
              <span className="flex items-center gap-2.5">{label}</span>
              <Icon className="size-4" aria-hidden />
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#EF4444] text-sm font-bold text-white hover:bg-[#DC2626]"
      >
        <LogOut className="size-4" aria-hidden />
        تسجيل الخروج
      </button>
    </aside>
  );
}

