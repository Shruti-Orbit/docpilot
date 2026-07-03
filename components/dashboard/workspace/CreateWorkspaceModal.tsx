"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createWorkspace } from "@/services/workspace.service";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateWorkspaceModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Workspace name is required");
      return;
    }

    try {
      setLoading(true);

      await createWorkspace({
        name,
        description,
      });

      toast.success("Workspace Created");

      setName("");
      setDescription("");

      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Unable to create workspace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Create Workspace
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workspace Name"
            className="w-full rounded-xl border p-4 outline-violet-500"
          />

          <textarea
            rows={4}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Workspace Description"
            className="w-full rounded-xl border p-4 outline-violet-500"
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="w-full rounded-xl bg-violet-600 py-4 font-semibold text-white"
          >
            {loading
              ? "Creating..."
              : "Create Workspace"}
          </button>
        </div>
      </div>
    </div>
  );
}