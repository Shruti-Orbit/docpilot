import {
  Eye,
  MessageSquare,
  Download,
  Trash2,
  FileText,
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
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-violet-100 p-3">
            <FileText className="text-violet-600" size={20} />
          </div>

          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-slate-500">PDF Document</p>
          </div>

        </div>
      </td>

      <td>{workspace}</td>

      <td>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold
          ${
            status === "Indexed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </td>

      <td>{uploaded}</td>

      <td>

        <div className="flex gap-3">

          <button>
            <Eye size={18} />
          </button>

          <button>
            <MessageSquare size={18} />
          </button>

          <button>
            <Download size={18} />
          </button>

          <button className="text-red-500">
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}