import { FileText } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">

      <FileText
        size={60}
        className="mx-auto text-violet-500"
      />

      <h2 className="mt-6 text-2xl font-bold">
        No Documents Found
      </h2>

      <p className="mt-2 text-slate-500">
        Upload your first PDF to start chatting with AI.
      </p>

      <button className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-white">
        Upload PDF
      </button>

    </div>
  );
}