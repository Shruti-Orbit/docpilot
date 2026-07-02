import {
  Upload,
  FolderPlus,
  Bot,
  Files,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Upload Document",
    description: "Upload PDFs and let AI index them.",
    icon: Upload,
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Create Workspace",
    description: "Organize documents into separate workspaces.",
    icon: FolderPlus,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Start AI Chat",
    description: "Ask questions from your uploaded documents.",
    icon: Bot,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Browse Documents",
    description: "View and manage your uploaded files.",
    icon: Files,
    color: "bg-orange-100 text-orange-700",
  },
];

export default function QuickActions() {
  return (
    <section>

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-slate-500">
          Start working with your AI workspace.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {action.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {action.description}
              </p>

              <div className="mt-6 flex items-center gap-2 font-medium text-violet-600 opacity-0 transition-all group-hover:opacity-100">
                Open
                <ArrowRight size={16} />
              </div>
            </button>
          );
        })}

      </div>

    </section>
  );
}