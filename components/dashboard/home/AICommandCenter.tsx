"use client";

import { Sparkles, SendHorizontal, Upload, FileText, X } from "lucide-react";
import SuggestionChip from "./SuggestionChip";

const suggestions = [
  "Summarize Document",
  "Compare PDFs",
  "Extract Key Points",
  "Find Important Dates",
  "Generate FAQs",
];

export default function AICommandCenter() {
  const documentUploaded = false; // backend se aayega

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-violet-50 p-8 shadow-sm">

      {/* Heading */}
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-violet-100 p-3">
          <Sparkles className="text-violet-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">AI Command Center</h2>
          <p className="text-slate-500">
            Upload a document and ask AI questions about it.
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="mt-8">

        {!documentUploaded ? (
          <div className="rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 p-8 text-center">

            <Upload
              className="mx-auto mb-4 text-violet-600"
              size={36}
            />

            <h3 className="text-lg font-semibold">
              Upload your PDF
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              AI will answer questions only from the uploaded document.
            </p>

            <button className="mt-5 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white hover:bg-violet-700">
              Upload PDF
            </button>

          </div>
        ) : (
          <div className="flex items-center justify-between rounded-2xl border bg-white p-5">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-violet-100 p-3">
                <FileText className="text-violet-600" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Employee-Handbook.pdf
                </h3>

                <p className="text-sm text-green-600">
                  Indexed Successfully
                </p>
              </div>

            </div>

            <button className="rounded-lg p-2 hover:bg-slate-100">
              <X />
            </button>

          </div>
        )}

      </div>

      {/* Ask AI */}

      <div className="mt-6 flex items-center rounded-2xl border bg-white p-3 shadow-sm">

        <input
          disabled={!documentUploaded}
          type="text"
          placeholder={
            documentUploaded
              ? "Ask anything about your document..."
              : "Upload a PDF first..."
          }
          className="flex-1 bg-transparent px-4 py-2 outline-none disabled:cursor-not-allowed"
        />

        <button
          disabled={!documentUploaded}
          className="rounded-xl bg-violet-600 p-3 text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <SendHorizontal size={20} />
        </button>

      </div>

      {/* Suggestions */}

      <div className="mt-6 flex flex-wrap gap-3">

        {suggestions.map((item) => (
          <SuggestionChip
            key={item}
            title={item}
          />
        ))}

      </div>

    </section>
  );
}