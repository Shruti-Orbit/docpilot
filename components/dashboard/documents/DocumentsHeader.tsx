import { ChangeEvent, useRef } from "react";
import { FileText, Upload } from "lucide-react";

interface DocumentsHeaderProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export default function DocumentsHeader({
  onUpload,
  isUploading,
}: DocumentsHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onUpload(file);
    }

    event.target.value = "";
  };

  return (
    <div className="mb-8 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-violet-100 p-3">
          <FileText className="text-violet-600" />
        </div>

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Documents
          </h1>

          <p className="mt-1 text-slate-500">
            Manage your uploaded PDFs and AI indexed documents.
          </p>

        </div>

      </div>

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
        className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
      >

        <Upload size={18} />

        Upload PDF

      </button>

    </div>
  );
}
