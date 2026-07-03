"use client";

import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Clock3,
  FileText,
  Upload,
} from "lucide-react";

interface ContinueWorkingProps {
  data: {
    recentDocuments?: {
      status: string;
      originalName: string;
      createdAt: string;
      fileSize: number;
    }[];
  } | null;
}

export default function ContinueWorking({
  data,
}: ContinueWorkingProps) {
  const router = useRouter();
  const document = data?.recentDocuments?.[0];

  // No document uploaded
  if (!document) {
    return (
      <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <Upload className="text-violet-700" size={26} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Continue Working
            </h2>

            <p className="text-slate-500">
              No document uploaded yet
            </p>
          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

          <FileText
            size={40}
            className="mx-auto text-slate-400"
          />

          <h3 className="mt-4 text-lg font-semibold">
            Upload your first PDF
          </h3>

          <p className="mt-2 text-slate-500">
            Start chatting with AI by uploading a document.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">

            <FileText
              className="text-violet-700"
              size={26}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Continue Working
            </h2>

            <p className="text-slate-500">
              Resume your latest document
            </p>

          </div>

        </div>

        <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">

          {document.status}

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">

        <p className="text-sm text-slate-500">
          Last Uploaded Document
        </p>

        <h3 className="mt-2 break-all text-xl font-semibold">

          {document.originalName}

        </h3>

        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">

          <Clock3 size={16} />

          {new Date(
            document.createdAt
          ).toLocaleString()}

        </div>

        <div className="mt-6 rounded-xl bg-white p-5">

          <p className="text-sm text-slate-500">

            File Size

          </p>

          <p className="mt-2 font-medium text-slate-800">

            {(document.fileSize / 1024).toFixed(1)} KB

          </p>

        </div>

      </div>

      <button
        onClick={() => router.push("/dashboard/upload")}
        className="mt-8 flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
      >

        Continue Reading

        <ArrowRight size={18} />

      </button>

    </section>
  );
}
