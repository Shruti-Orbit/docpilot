interface SuggestionChipProps {
  title: string;
}

export default function SuggestionChip({
  title,
}: SuggestionChipProps) {
  return (
    <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-violet-500 hover:bg-violet-50 hover:text-violet-700">
      {title}
    </button>
  );
}