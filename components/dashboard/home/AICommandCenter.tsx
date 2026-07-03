"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  SendHorizontal,
  Upload,
  FileText,
  X,
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import SuggestionChip from "./SuggestionChip";
import { askAI } from "@/services/chat.service";

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

export default function AICommandCenter({
  data,
}: Props) {
  const latestDocument = data?.recentDocuments?.[0];

  const documentUploaded = !!latestDocument;

  const workspaceId =
    typeof window !== "undefined"
      ? localStorage.getItem("workspaceId")
      : null;

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    ChatMessage[]
  >([]);

  const chatEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleAskAI = async () => {
    if (!question.trim()) return;

    if (!latestDocument) {
      toast.error("Upload a document first.");
      return;
    }

    if (!workspaceId) {
      toast.error("Please select a workspace.");
      return;
    }

    try {
      setLoading(true);

      const res = await askAI({
        documentId: latestDocument._id,
        workspaceId,
        question,
      });

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
    } catch (error) {
      console.log(error);

      toast.error("Unable to get AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-violet-50 p-8 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="rounded-2xl bg-violet-100 p-3">
          <Sparkles className="text-violet-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Command Center
          </h2>

          <p className="text-slate-500">
            Upload a document and ask AI questions.
          </p>
        </div>

      </div>

      {/* Selected Document */}

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
              Upload a document first.
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

                <p className="text-green-600 text-sm">
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

      {/* Ask */}

      <div className="mt-6 flex items-center rounded-2xl border bg-white p-3">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAskAI();
            }
          }}
          disabled={!documentUploaded || loading}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent px-4 py-2 outline-none"
        />

        <button
          onClick={handleAskAI}
          disabled={!documentUploaded || loading}
          className="rounded-xl bg-violet-600 p-3 text-white"
        >
          {loading ? (
            <Loader2
              size={20}
              className="animate-spin"
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
              className={`flex ${
                item.type === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[80%] rounded-2xl p-5 ${
                  item.type === "user"
                    ? "bg-violet-600 text-white"
                    : "bg-white border"
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