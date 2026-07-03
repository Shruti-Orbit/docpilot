import { Search } from "lucide-react";

interface Workspace {
  _id: string;
  name: string;
}

interface DocumentFiltersProps {
  search: string;
  selectedWorkspaceId: string;
  workspaces: Workspace[];
  onSearchChange: (value: string) => void;
  onWorkspaceChange: (value: string) => void;
}

export default function DocumentFilters({
  search,
  selectedWorkspaceId,
  workspaces,
  onSearchChange,
  onWorkspaceChange,
}: DocumentFiltersProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

      <div className="relative w-full max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-violet-500"
        />

      </div>

      <select
        value={selectedWorkspaceId}
        onChange={(event) => onWorkspaceChange(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none"
      >

        <option value="all">All Workspaces</option>

        {workspaces.map((workspace) => (
          <option
            key={workspace._id}
            value={workspace._id}
          >
            {workspace.name}
          </option>
        ))}

      </select>

    </div>
  );
}
