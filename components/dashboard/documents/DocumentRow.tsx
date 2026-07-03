import {
  Eye,
  MessageSquare,
  Download,
  Trash2,
  FileText,
} from "lucide-react";

interface DocumentRowProps {
  id: string;
  name: string;
  workspace: string;
  status: string;
  uploaded: string;
  fileSize: number;
  onDelete: (id: string) => void;
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatStatus = (status: string) => {
  if (status === "completed") {
    return "Indexed";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function DocumentRow({
  id,
  name,
  workspace,
  status,
  uploaded,
  fileSize,
  onDelete,
}: DocumentRowProps) {
  const statusLabel = formatStatus(status);

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-violet-100 p-3">
            <FileText className="text-violet-600" size={20} />
          </div>

          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-slate-500">
              PDF Document - {formatFileSize(fileSize)}
            </p>
          </div>

        </div>
      </td>

      <td>{workspace}</td>

      <td>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold
          ${
            statusLabel === "Indexed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {statusLabel}
        </span>
      </td>

      <td>{formatDate(uploaded)}</td>

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

          <button
            type="button"
            className="text-red-500"
            onClick={() => onDelete(id)}
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}
