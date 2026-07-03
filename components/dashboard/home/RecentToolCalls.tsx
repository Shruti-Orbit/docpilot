"use client";

import { useEffect, useState } from "react";
import { getRecentToolCalls } from "@/services/tool.service";

interface ToolCall {
  _id: string;
  toolName: string;
  success: boolean;
  timestamp: string;
}

export default function RecentToolCalls() {
  const [toolCalls, setToolCalls] = useState<ToolCall[]>([]);

  useEffect(() => {
    const loadToolCalls = async () => {
      const workspaceId = localStorage.getItem("workspaceId");

      if (!workspaceId) {
        setToolCalls([]);
        return;
      }

      try {
        const response = await getRecentToolCalls(workspaceId);
        setToolCalls(response.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    void Promise.resolve().then(loadToolCalls);
  }, []);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">
        Recent Tool Calls
      </h2>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-sm uppercase tracking-wide text-slate-500">
              <th className="px-4 pb-4">Tool Name</th>
              <th className="px-4 pb-4">Status</th>
              <th className="px-4 pb-4">Time</th>
            </tr>
          </thead>

          <tbody>
            {toolCalls.map((toolCall) => (
              <tr
                key={toolCall._id}
                className="border-b border-slate-100"
              >
                <td className="px-4 py-4">
                  {toolCall.toolName}
                </td>
                <td className="px-4 py-4">
                  {toolCall.success ? "Success" : "Failed"}
                </td>
                <td className="px-4 py-4">
                  {new Date(
                    toolCall.timestamp
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
