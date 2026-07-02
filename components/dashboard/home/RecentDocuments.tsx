import DocumentRow from "./DocumentRow";

const documents = [
  {
    name: "Employee-Handbook.pdf",
    workspace: "HR",
    status: "Indexed" as const,
    uploaded: "2 hours ago",
  },
  {
    name: "Invoice-April.pdf",
    workspace: "Finance",
    status: "Processing" as const,
    uploaded: "Today",
  },
  {
    name: "Vendor-Agreement.pdf",
    workspace: "Legal",
    status: "Indexed" as const,
    uploaded: "Yesterday",
  },
];

export default function RecentDocuments() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Recent Documents
          </h2>

          <p className="mt-1 text-slate-500">
            Recently uploaded and AI indexed files.
          </p>

        </div>

        <button className="rounded-xl border border-slate-200 px-5 py-3 font-medium transition hover:bg-slate-50">
          View All
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200 text-left text-sm uppercase tracking-wide text-slate-500">

              <th className="px-6 pb-4">
                Document
              </th>

              <th className="px-6 pb-4">
                Workspace
              </th>

              <th className="px-6 pb-4">
                Status
              </th>

              <th className="px-6 pb-4">
                Uploaded
              </th>

              <th className="px-6 pb-4">
                Actions
              </th>

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

    </section>
  );
}