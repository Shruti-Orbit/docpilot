import {
  FolderKanban,
  Users,
  FileText,
  ArrowRight,
  CircleCheck,
} from "lucide-react";

interface WorkspaceCardProps {
  title: string;
  description: string;
  documents: number;
  members: number;
  lastActive: string;
}

export default function WorkspaceCard({
  title,
  description,
  documents,
  members,
  lastActive,
}: WorkspaceCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">

          <FolderKanban
            size={28}
            className="text-violet-700"
          />

        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

          <CircleCheck size={14} />

          Active

        </div>

      </div>

      <h3 className="mt-6 text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

      {/* Stats */}

      <div className="mt-6 flex justify-between">

        <div>

          <div className="flex items-center gap-2 text-slate-500">

            <FileText size={16} />

            Documents

          </div>

          <h4 className="mt-1 text-xl font-semibold">
            {documents}
          </h4>

        </div>

        <div>

          <div className="flex items-center gap-2 text-slate-500">

            <Users size={16} />

            Members

          </div>

          <h4 className="mt-1 text-xl font-semibold">
            {members}
          </h4>

        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <span className="text-sm text-slate-500">

          Last Active

          <br />

          {lastActive}

        </span>

        <button className="flex items-center gap-2 font-semibold text-violet-600 transition group-hover:gap-3">

          Open

          <ArrowRight size={18} />

        </button>

      </div>

    </div>
  );
}