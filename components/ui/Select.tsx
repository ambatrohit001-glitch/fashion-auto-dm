type SelectProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};

export default function Select({
  label,
  value,
  onChange,
  options,
}: SelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}