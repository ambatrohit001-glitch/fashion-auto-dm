type Props = {
  title: string;
  value: string | number;
};

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 p-6 hover:border-indigo-500 transition">
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-white mt-3">
        {value}
      </h2>
    </div>
  );
}