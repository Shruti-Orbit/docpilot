import { LucideIcon } from "lucide-react";

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
}

export default function InputField({
  label,
  icon: Icon,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          {...props}
          className="h-14 w-full rounded-2xl border border-slate-300 pl-14 pr-4 outline-none transition-all duration-300 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}