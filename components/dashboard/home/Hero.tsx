"use client";

import { useEffect, useState } from "react";
import { Sparkles, FolderKanban } from "lucide-react";

interface HeroProps {
  data: any;
}

export default function Hero({ data }: HeroProps) {
  const [workspaceName, setWorkspaceName] =
    useState("Personal Workspace");

  useEffect(() => {
    const name = localStorage.getItem("workspaceName");

    if (name) {
      setWorkspaceName(name);
    }
  }, []);

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <section className="rounded-3xl bg-gradient-to-r from-violet-600 to-purple-600 p-8 text-white shadow-lg">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm">
        <Sparkles size={14} />
        AI Workspace Ready
      </div>

      <h1 className="mt-4 text-3xl font-bold">
        {greeting}, {data?.user?.name} 👋
      </h1>

      <p className="mt-2 max-w-xl text-violet-100">
        You have{" "}
        <strong>{data?.stats?.totalDocuments}</strong> document(s)
        uploaded, using{" "}
        <strong>{data?.stats?.totalStorage}</strong> storage.
      </p>

      {/* Current Workspace */}
      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
        <FolderKanban size={18} />
        <span className="font-medium">
          Current Workspace :
        </span>
        <span className="font-bold">
          {workspaceName}
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-6">
        <div className="rounded-2xl bg-white/10 px-5 py-4">
          <p className="text-sm text-violet-100">
            Documents
          </p>

          <h3 className="text-2xl font-bold">
            {data?.stats?.totalDocuments}
          </h3>
        </div>

        <div className="rounded-2xl bg-white/10 px-5 py-4">
          <p className="text-sm text-violet-100">
            Storage
          </p>

          <h3 className="text-2xl font-bold">
            {data?.stats?.totalStorage}
          </h3>
        </div>

        <div className="rounded-2xl bg-white/10 px-5 py-4">
          <p className="text-sm text-violet-100">
            Recent Upload
          </p>

          <h3 className="max-w-[220px] truncate text-lg font-semibold">
            {data?.stats?.recentUpload}
          </h3>
        </div>
      </div>
    </section>
  );
}