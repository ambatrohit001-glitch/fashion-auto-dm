"use client";

type CampaignSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CampaignSearch({
  value,
  onChange,
}: CampaignSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search campaigns..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
    />
  );
}