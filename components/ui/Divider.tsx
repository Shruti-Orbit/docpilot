export default function Divider() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-slate-200"></div>

      <span className="text-sm text-slate-400">
        OR
      </span>

      <div className="h-px flex-1 bg-slate-200"></div>
    </div>
  );
}