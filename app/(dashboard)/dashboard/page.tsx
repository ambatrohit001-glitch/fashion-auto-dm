import DashboardCard from "@/components/DashboardCard";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Welcome back 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Here's what's happening with your creator business today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardCard title="Products" value="0" />
        <DashboardCard title="Automations" value="0" />
        <DashboardCard title="Clicks" value="0" />
        <DashboardCard title="Revenue" value="₹0" />
      </div>

      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <p className="text-slate-400 mt-4">
          No recent activity yet.
        </p>
      </div>
    </div>
  );
}