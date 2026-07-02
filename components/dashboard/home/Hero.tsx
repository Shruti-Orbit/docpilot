import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-violet-600 to-purple-600 p-8 text-white shadow-lg">

      <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm">
        <Sparkles size={14} />
        AI Workspace Ready
      </div>

      <h1 className="mt-4 text-3xl font-bold">
        Good Evening, Shruti 👋
      </h1>

      <p className="mt-2 max-w-xl text-violet-100">
        Welcome back! Ask AI questions, upload documents, or continue your previous work.
      </p>

    </section>
  );
}