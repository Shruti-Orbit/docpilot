"use client";

import { useEffect, useState } from "react";
import DocumentRow from "./DocumentRow";
import { getDocuments } from "@/services/document.service";

export default function RecentDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const workspaceId = localStorage.getItem("workspaceId");

      if (!workspaceId) {
        setLoading(false);
        return;
      }

      const response = await getDocuments(workspaceId);

      setDocuments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Documents
          </h2>

          <p className="mt-1 text-slate-500">
            Documents from selected workspace.
          </p>
        </div>

        <button className="rounded-xl border border-slate-200 px-5 py-3 font-medium hover:bg-slate-50">
          View All
        </button>

      </div>

      {loading ? (

        <div className="py-20 text-center">
          Loading Documents...
        </div>

      ) : documents.length === 0 ? (

        <div className="py-20 text-center text-slate-500">
          No Documents Found
        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 text-left text-sm uppercase tracking-wide text-slate-500">

                <th className="px-6 pb-4">Document</th>

                <th className="px-6 pb-4">Workspace</th>

                <th className="px-6 pb-4">Status</th>

                <th className="px-6 pb-4">Uploaded</th>

                <th className="px-6 pb-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              {documents.map((doc) => (

                <DocumentRow
                  key={doc._id}
                  name={doc.originalName}
                  workspace={
                    localStorage.getItem("workspaceName") ||
                    "Workspace"
                  }
                  status={doc.status}
                  uploaded={new Date(
                    doc.createdAt
                  ).toLocaleDateString()}
                />

              ))}

            </tbody>

          </table>

        </div>

      )}

    </section>
  );
}