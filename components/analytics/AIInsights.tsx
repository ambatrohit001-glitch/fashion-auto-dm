"use client";

type Props = {
  revenue: number;
  campaigns: number;
  products: number;
  topProduct: string;
};

export default function AIInsights({
  revenue,
  campaigns,
  products,
  topProduct,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold text-white">
          🤖 AI Insights
        </h2>

        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-300">
          Live
        </span>

      </div>

      <div className="space-y-5">

        <div>
          <p className="text-sm text-slate-400">
            Total Revenue
          </p>

          <p className="mt-1 text-3xl font-bold text-emerald-400">
            ₹{revenue.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Active Campaigns
          </p>

          <p className="text-white">
            {campaigns}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Products
          </p>

          <p className="text-white">
            {products}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-400">
            Best Product
          </p>

          <p className="font-semibold text-indigo-300">
            {topProduct || "No products yet"}
          </p>
        </div>

        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4">

          <p className="text-sm leading-6 text-slate-300">

            {products === 0
              ? "Start by adding your first affiliate product."

              : campaigns === 0
              ? "Create your first campaign to begin tracking performance."

              : revenue === 0
              ? "Promote your campaigns to start generating affiliate revenue."

              : "Your creator business is growing. Keep optimizing your best-performing campaigns."}

          </p>

        </div>

      </div>

    </div>
  );
}