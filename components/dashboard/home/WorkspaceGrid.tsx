import WorkspaceCard from "./WorkspaceCard";

const workspaces = [
  {
    title: "HR Workspace",
    description: "Employee policies and HR documents",
    documents: 24,
    members: 5,
    lastActive: "2 hours ago",
  },
  {
    title: "Finance Workspace",
    description: "Invoices and financial reports",
    documents: 16,
    members: 3,
    lastActive: "Yesterday",
  },
  {
    title: "Legal Workspace",
    description: "Contracts and legal agreements",
    documents: 11,
    members: 2,
    lastActive: "Today",
  },
];

export default function WorkspaceGrid() {
  return (
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

        <button className="rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700">

          + New Workspace

        </button>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        {workspaces.map((workspace) => (
          <WorkspaceCard
            key={workspace.title}
            {...workspace}
          />
        ))}

      </div>

    </section>
  );
}