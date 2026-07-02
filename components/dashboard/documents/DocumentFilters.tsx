import { Search } from "lucide-react";

export default function DocumentFilters() {
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
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-violet-500"
        />

      </div>

      <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none">

        <option>All Workspaces</option>

        <option>HR</option>

        <option>Finance</option>

        <option>Legal</option>

      </select>

    </div>
  );
}