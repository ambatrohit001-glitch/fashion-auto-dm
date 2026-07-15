type Props = {
  total: number;
  active: number;
  inactive: number;
};

export default function AutomationStats({
  total,
  active,
  inactive,
}: Props) {
  const stats = [
    {
      title: "Total Automations",
      value: total,
      color: "text-indigo-400",
    },
    {
      title: "Active",
      value: active,
      color: "text-green-400",
    },
    {
      title: "Inactive",
      value: inactive,
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm"
        >
          <p className="text-sm text-slate-400">
            {stat.title}
          </p>

          <h2
            className={`mt-3 text-4xl font-bold ${stat.color}`}
          >
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}