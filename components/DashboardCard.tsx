type Props = {
  title: string;
  value: string | number;
};

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 transition hover:border-indigo-500">

      <p className="text-sm font-medium text-slate-400">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-bold text-white">
        {value}
      </h2>

    </div>
  );
}