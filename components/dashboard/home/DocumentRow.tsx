import {
  FileText,
  Eye,
  Download,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

interface DocumentRowProps {
  name: string;
  workspace: string;
  status: string;
  uploaded: string;
}

export default function DocumentRow({
  name,
  workspace,
  status,
  uploaded,
}: DocumentRowProps) {
  const statusStyles: Record<string, string> = {
    completed: "bg-green-100 text-green-700",
    processing: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-violet-100 p-3">
            <FileText className="text-violet-700" size={20} />
          </div>

          <div>
            <h4 className="font-semibold text-slate-800">
              {name}
            </h4>

            <p className="text-sm text-slate-500">
              PDF Document
            </p>
          </div>

        </div>
      </td>

      <td className="px-6 py-5 text-slate-600">
        {workspace}
      </td>

      <td className="px-6 py-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>

      <td className="px-6 py-5 text-slate-500">
        {uploaded}
      </td>

      <td className="px-6 py-5">

        <div className="flex items-center gap-2">

          <button className="rounded-lg p-2 hover:bg-slate-100">
            <Eye size={18} />
          </button>

          <button className="rounded-lg p-2 hover:bg-slate-100">
            <MessageSquare size={18} />
          </button>

          <button className="rounded-lg p-2 hover:bg-slate-100">
            <Download size={18} />
          </button>

          <button className="rounded-lg p-2 hover:bg-slate-100">
            <MoreHorizontal size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}