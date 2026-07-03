interface Props {
  title: string;
  onClick?: () => void;
}

export default function SuggestionChip({
  title,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm transition hover:border-violet-400 hover:bg-violet-50"
    >
      {title}
    </button>
  );
}