import { CheckCircle2, Clock3, UploadCloud } from "lucide-react";

const activities = [
  {
    title: "NDA indexed successfully",
    detail: "Legal Ops",
    icon: CheckCircle2,
  },
  {
    title: "Board packet summary queued",
    detail: "Executive",
    icon: Clock3,
  },
  {
    title: "3 files uploaded",
    detail: "People Team",
    icon: UploadCloud,
  },
];

export default function ActivityTimeline() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-950">
        Activity Timeline
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Recent document and AI events.
      </p>

      <div className="mt-6 space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.title} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <Icon size={17} />
              </span>

              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {activity.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  {activity.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
