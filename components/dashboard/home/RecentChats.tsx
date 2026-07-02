import { MessageSquareText } from "lucide-react";

const chats = [
  {
    title: "Contract risk summary",
    time: "9:40 AM",
  },
  {
    title: "Policy answer sources",
    time: "Yesterday",
  },
  {
    title: "Board packet highlights",
    time: "Mon",
  },
];

export default function RecentChats() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">Recent Chats</h3>
      <p className="mt-1 text-sm text-slate-500">
        Continue previous AI conversations.
      </p>

      <div className="mt-5 space-y-3">
        {chats.map((chat) => (
          <button
            key={chat.title}
            className="flex w-full items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 text-left transition hover:border-violet-200 hover:bg-violet-50/50"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                <MessageSquareText size={18} />
              </span>

              <span className="truncate text-sm font-semibold text-slate-900">
                {chat.title}
              </span>
            </span>

            <span className="text-xs text-slate-500">{chat.time}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
