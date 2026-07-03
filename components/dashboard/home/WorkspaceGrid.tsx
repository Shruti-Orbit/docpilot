"use client";

import { useEffect, useState } from "react";
import WorkspaceCard from "./WorkspaceCard";
import CreateWorkspaceModal from "../workspace/CreateWorkspaceModal";
import { getWorkspaces } from "@/services/workspace.service";
import { toast } from "sonner";

export default function WorkspaceGrid() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadWorkspaces = async () => {
    try {
      setLoading(true);

      const res = await getWorkspaces();

      setWorkspaces(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const handleOpenWorkspace = (
    id: string,
    name: string
  ) => {
    localStorage.setItem("workspaceId", id);
    localStorage.setItem("workspaceName", name);

    toast.success(`${name} Selected`);

    window.location.reload();
  };

  return (
    <>
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Your Workspaces
            </h2>

            <p className="mt-1 text-slate-500">
              Select a workspace to continue working.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            + New Workspace
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">
            Loading Workspaces...
          </div>
        ) : workspaces.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <h3 className="text-xl font-semibold">
              No Workspace Found
            </h3>

            <p className="mt-2 text-slate-500">
              Create your first workspace to start organizing documents.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700"
            >
              Create Workspace
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {workspaces.map((workspace: any) => (
              <WorkspaceCard
                key={workspace._id}
                id={workspace._id}
                title={workspace.name}
                description={workspace.description}
                documents={workspace.documents ?? 0}
                members={workspace.members ?? 1}
                lastActive={new Date(workspace.createdAt).toLocaleDateString()}
                onOpen={handleOpenWorkspace}
              />
            ))}
          </div>
        )}
      </section>

      <CreateWorkspaceModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={loadWorkspaces}
      />
    </>
  );
}