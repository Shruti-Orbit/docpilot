import DocumentRow from "./DocumentRow";

const documents = [
  {
    name: "Employee-Handbook.pdf",
    workspace: "HR",
    status: "Indexed",
    uploaded: "2 hours ago",
  },
  {
    name: "Invoice-April.pdf",
    workspace: "Finance",
    status: "Processing",
    uploaded: "Today",
  },
  {
    name: "Vendor-Agreement.pdf",
    workspace: "Legal",
    status: "Indexed",
    uploaded: "Yesterday",
  },
];

export default function DocumentsTable() {
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

          {documents.map((doc) => (
            <DocumentRow
              key={doc.name}
              {...doc}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}