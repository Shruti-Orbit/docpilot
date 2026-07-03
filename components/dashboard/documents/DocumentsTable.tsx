import DocumentRow from "./DocumentRow";
import type { DocumentItem } from "./DocumentsPage";

interface DocumentsTableProps {
  documents: DocumentItem[];
  isLoading: boolean;
  onDelete: (id: string) => void;
}

export default function DocumentsTable({
  documents,
  isLoading,
  onDelete,
}: DocumentsTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-slate-50">

          <tr>

            <th className="px-6 py-4 text-left">
              Document
            </th>

            <th>Workspace</th>

            <th>Status</th>

            <th>Uploaded</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-slate-100" />
                      <div className="space-y-2">
                        <div className="h-4 w-44 rounded bg-slate-100" />
                        <div className="h-3 w-28 rounded bg-slate-100" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="h-4 w-20 rounded bg-slate-100" />
                  </td>
                  <td>
                    <div className="h-6 w-20 rounded-full bg-slate-100" />
                  </td>
                  <td>
                    <div className="h-4 w-24 rounded bg-slate-100" />
                  </td>
                  <td>
                    <div className="h-4 w-24 rounded bg-slate-100" />
                  </td>
                </tr>
              ))
            : documents.map((doc) => (
                <DocumentRow
                  key={doc._id}
                  id={doc._id}
                  name={doc.originalName}
                  workspace={doc.workspaceName}
                  status={doc.status}
                  uploaded={doc.createdAt}
                  fileSize={doc.fileSize}
                  onDelete={onDelete}
                />
              ))}

        </tbody>

      </table>

    </div>
  );
}
