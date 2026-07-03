"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  FolderKanban,
} from "lucide-react";

import { getWorkspaces } from "@/services/workspace.service";

type Workspace = {
  _id: string;
  name: string;
};

export default function Topbar() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] =
    useState<Workspace | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadWorkspaces = async () => {
      try {
        const response = await getWorkspaces();
        const workspaceList = response.data || [];

        setWorkspaces(workspaceList);

        if (workspaceList.length === 0) {
          return;
        }

        const storedWorkspaceId =
          localStorage.getItem("workspaceId");

        const currentWorkspace =
          workspaceList.find(
            (workspace: Workspace) =>
              workspace._id === storedWorkspaceId
          ) || workspaceList[0];

        localStorage.setItem(
          "workspaceId",
          currentWorkspace._id
        );
        localStorage.setItem(
          "workspaceName",
          currentWorkspace.name
        );

        setSelectedWorkspace(currentWorkspace);
      } catch (error) {
        console.error(error);
      }
    };

    loadWorkspaces();
  }, []);

  const handleWorkspaceSelect = (workspace: Workspace) => {
    localStorage.setItem("workspaceId", workspace._id);
    localStorage.setItem("workspaceName", workspace.name);
    setSelectedWorkspace(workspace);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur-md">

      {/* Search */}

      <div className="w-[620px]" />

      {/*
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
      */}

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Workspace */}

        <div className="relative">

          <button
            onClick={() => setOpen((value) => !value)}
            className="flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 transition hover:border-violet-400 hover:bg-violet-50"
          >

            <FolderKanban
              size={18}
              className="text-violet-600"
            />

            <span className="font-medium">
              {selectedWorkspace?.name || "My Workspace"}
            </span>

            <ChevronDown size={16} />

          </button>

          {open && (
            <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              {workspaces.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-500">
                  No workspaces found
                </div>
              ) : (
                workspaces.map((workspace) => (
                  <button
                    key={workspace._id}
                    onClick={() =>
                      handleWorkspaceSelect(workspace)
                    }
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
                  >
                    {workspace.name}
                  </button>
                ))
              )}
            </div>
          )}

        </div>

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
