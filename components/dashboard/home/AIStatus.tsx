import { Bot, CircleCheckBig, LoaderCircle } from "lucide-react";

export default function AIStatus() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">

          <Bot
            className="text-green-600"
            size={26}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            AI Status
          </h2>

          <p className="text-slate-500">
            Workspace processing overview
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-5">

          <span>Indexed Documents</span>

          <span className="font-bold">
            24
          </span>

        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-5">

          <span>Pending Indexing</span>

          <span className="flex items-center gap-2 font-bold">

            <LoaderCircle
              className="animate-spin"
              size={16}
            />

            2

          </span>

        </div>

        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-5">

          <CircleCheckBig className="text-green-600" />

          <div>

            <h4 className="font-semibold text-green-700">
              AI Ready
            </h4>

            <p className="text-sm text-green-600">
              Your workspace is ready for AI conversations.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}