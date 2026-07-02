"use client";

import {
  Bell,
  ChevronDown,
  Search,
  FolderKanban,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur-md">

      {/* Search */}

      <div className="relative w-[620px]">

        <Search
          size={18}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search documents, workspaces or ask AI..."
          className="h-14 w-full rounded-full border border-slate-200 bg-slate-50 pl-14 pr-5 text-sm outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
        />

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Workspace */}

        <button className="flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 transition hover:border-violet-400 hover:bg-violet-50">

          <FolderKanban
            size={18}
            className="text-violet-600"
          />

          <span className="font-medium">
            My Workspace
          </span>

          <ChevronDown size={16} />

        </button>

        {/* Notification */}

        <button className="relative flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white transition hover:bg-slate-100">

          <Bell size={18} />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}

        <button className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 transition hover:border-violet-400">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-600 font-semibold text-white">
            S
          </div>

          <div className="hidden text-left md:block">

            <h4 className="text-sm font-semibold text-slate-800">
              Shruti Singh
            </h4>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

          <ChevronDown
            size={18}
            className="text-slate-500"
          />

        </button>

      </div>

    </header>
  );
}