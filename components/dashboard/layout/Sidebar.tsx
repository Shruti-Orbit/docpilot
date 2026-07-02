"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Upload,
  Bot,
  Settings,
  LogOut,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Workspaces",
    href: "/dashboard/workspaces",
    icon: FolderKanban,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Upload",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    title: "AI Chat",
    href: "/dashboard/ai-chat",
    icon: Bot,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r bg-white">

      {/* Logo */}

      <div className="border-b p-8">

        <h1 className="text-3xl font-bold text-violet-700">
          DocPilot AI
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Document Intelligence
        </p>

      </div>

      {/* Navigation */}

      <nav className="space-y-2 p-5">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.title}
              href={menu.href}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
            >
              <Icon size={20} />

              <span>{menu.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}

      <div className="absolute bottom-6 w-72 px-5">

        <button className="flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-slate-600 transition hover:bg-red-50 hover:text-red-600">
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}