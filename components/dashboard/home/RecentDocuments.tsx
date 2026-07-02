"use client";

import { useEffect, useState } from "react";
import DocumentRow from "./DocumentRow";
import { getDocuments } from "@/services/document.service";

export default function RecentDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getDocuments();

        setDocuments(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

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

      {loading ? (
        <div className="py-20 text-center text-slate-500">
          Loading documents...
        </div>
      ) : documents.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          No documents uploaded yet.
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
                  workspace="Personal"
                  status={doc.status}
                  uploaded={new Date(doc.createdAt).toLocaleDateString()}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}