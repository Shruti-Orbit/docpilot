"use client";


import {
  Sparkles,
  SendHorizontal,
  Upload,
  FileText,
  X,
  Loader2,
} from "lucide-react";

import SuggestionChip from "./SuggestionChip";
import { askAI } from "@/services/chat.service";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";



const suggestions = [
  "Summarize Document",
  "Compare PDFs",
  "Extract Key Points",
  "Find Important Dates",
  "Generate FAQs",
];

interface Props {
  data: any;
}

interface ChatMessage {
  type: "user" | "ai";
  message: string;
}

export default function AICommandCenter({ data }: Props) {
  const latestDocument = data?.recentDocuments?.[0];

  const documentUploaded = !!latestDocument;

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleAskAI = async () => {
    if (!question.trim()) return;

    if (!latestDocument) return;

    try {
      setLoading(true);

      const res = await askAI({
        documentId: latestDocument._id,
        question,
      });

      console.log(res);

      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          message: question,
        },
        {
          type: "ai",
          message: res.answer,
        },
      ]);

      setQuestion("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="ai-command-center"
      className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-violet-50 p-8 shadow-sm"
    >
      {/* Heading */}

      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-violet-100 p-3">
          <Sparkles className="text-violet-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Command Center
          </h2>

          <p className="text-slate-500">
            Upload a document and ask AI questions about it.
          </p>
        </div>
      </div>

      {/* Uploaded PDF */}

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
              Upload a document first to start chatting.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-2xl border bg-white p-5">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-violet-100 p-3">
                <FileText className="text-violet-600" />
              </div>

              <div>
                <h3 className="font-semibold">
                  {latestDocument.originalName}
                </h3>

                <p className="text-sm text-green-600">
                  Ready for AI
                </p>
              </div>
            </div>

            <button
              onClick={() => setMessages([])}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X />
            </button>
          </div>
        )}
      </div>

      {/* Ask AI */}

      <div className="mt-6 flex items-center rounded-2xl border bg-white p-3 shadow-sm">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={!documentUploaded || loading}
          type="text"
          placeholder={
            documentUploaded
              ? "Ask anything about this document..."
              : "Upload PDF first..."
          }
          className="flex-1 bg-transparent px-4 py-2 outline-none"
        />

        <button
          onClick={handleAskAI}
          disabled={!documentUploaded || loading}
          className="rounded-xl bg-violet-600 p-3 text-white disabled:bg-slate-300"
        >
          {loading ? (
            <Loader2
              className="animate-spin"
              size={20}
            />
          ) : (
            <SendHorizontal size={20} />
          )}
        </button>
      </div>

      {/* Suggestions */}

      <div className="mt-6 flex flex-wrap gap-3">
        {suggestions.map((item) => (
          <SuggestionChip
            key={item}
            title={item}
            onClick={() => setQuestion(item)}
          />
        ))}
      </div>

      {/* Chat */}

      {messages.length > 0 && (
        <div className="mt-8 max-h-[500px] space-y-5 overflow-y-auto rounded-2xl border bg-slate-50 p-5">
          {messages.map((item, index) => (
            <div
              key={index}
              className={`flex ${item.type === "user"
                ? "justify-end"
                : "justify-start"
                }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-5 shadow-sm ${item.type === "user"
                  ? "bg-violet-600 text-white"
                  : "border bg-white"
                  }`}
              >
                <p className="mb-2 text-xs font-bold uppercase opacity-70">
                  {item.type === "user"
                    ? "You"
                    : "DocPilot AI"}
                </p>

                <div className="whitespace-pre-wrap leading-7">
                  <ReactMarkdown>
                    {item.message}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      )}
    </section>
  );
}