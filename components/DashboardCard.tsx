type Props = {
  title: string;
  value: string | number;
  icon?: string;
  change?: string;
  positive?: boolean;
};

export default function DashboardCard({
  title,
  value,
  icon,
  change,
  positive = true,
}: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium tracking-wide text-slate-400">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-bold text-white">
            {value}
          </h2>

          {change && (
            <p
              className={`mt-5 text-sm font-medium ${
                positive
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {change}
            </p>
          )}

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/20 text-3xl backdrop-blur">
          {icon}
        </div>

      </div>

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl" />

    </div>
  );
}