"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export default function PasswordField({
  label,
  placeholder,
  register,
  error,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="mb-2 block font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          className="h-14 w-full rounded-2xl border border-slate-300 pl-14 pr-14 outline-none transition-all duration-300 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}