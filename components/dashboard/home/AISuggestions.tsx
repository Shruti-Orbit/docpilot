"use client";

import { Sparkles, SendHorizontal } from "lucide-react";
import SuggestionChip from "./SuggestionChip";

const suggestions = [
  "Summarize Document",
  "Compare PDFs",
  "Extract Key Points",
  "Find Important Dates",
  "Generate FAQs",
];

export default function AICommandCenter() {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-white to-violet-50 p-8 shadow-sm">

      {/* Heading */}

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-violet-100 p-3">
          <Sparkles className="text-violet-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            AI Command Center
          </h2>

          <p className="text-slate-500">
            Ask anything about your uploaded documents.
          </p>
        </div>

      </div>

      {/* Input */}

      <div className="mt-8 flex items-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">

        <input
          type="text"
          placeholder="Ask AI anything about your documents..."
          className="flex-1 bg-transparent px-4 py-2 text-slate-800 outline-none"
        />

        <button className="rounded-xl bg-violet-600 p-3 text-white transition hover:bg-violet-700">
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