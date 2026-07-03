import { ChangeEvent, useRef } from "react";
import { FileText } from "lucide-react";

interface EmptyStateProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export default function EmptyState({
  onUpload,
  isUploading,
}: EmptyStateProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onUpload(file);
    }

    event.target.value = "";
  };

  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">

      <FileText
        size={60}
        className="mx-auto text-violet-500"
      />

      <h2 className="mt-6 text-2xl font-bold">
        No Documents Found
      </h2>

      <p className="mt-2 text-slate-500">
        Upload your first PDF to start chatting with AI.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current?.click()}
        className="mt-6 rounded-xl bg-violet-600 px-6 py-3 text-white"
      >
        Upload PDF
      </button>

    </div>
  );
}
