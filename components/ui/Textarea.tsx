import type { ChangeEvent } from "react";

type TextareaProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
};

export default function Textarea({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  rows = 5,
}: TextareaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
      />
    </div>
  );
}