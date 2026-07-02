import { ArrowRight, Clock3, FileText } from "lucide-react";

export default function ContinueWorking() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
            <FileText className="text-violet-700" size={26} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Continue Working
            </h2>

            <p className="text-slate-500">
              Resume your last AI session
            </p>

          </div>

        </div>

        <div className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
          Active
        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">

        <p className="text-sm text-slate-500">
          Last Opened Document
        </p>

        <h3 className="mt-2 text-xl font-semibold">
          Employee-Handbook.pdf
        </h3>

        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
          <Clock3 size={16} />
          2 hours ago
        </div>

        <div className="mt-6 rounded-xl bg-white p-5">

          <p className="text-sm text-slate-500">
            Last AI Question
          </p>

          <p className="mt-2 font-medium text-slate-800">
            "Summarize the leave policy and highlight important rules."
          </p>

        </div>

      </div>

      <button className="mt-8 flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700">

        Continue Session

        <ArrowRight size={18} />

      </button>

    </section>
  );
}