"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RevenueData = {
  name: string;
  revenue: number;
};

type Props = {
  data: RevenueData[];
};

export default function RevenueChart({
  data,
}: Props) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <h2 className="text-xl font-semibold text-white">
          Revenue Overview
        </h2>

        <div className="flex h-80 flex-col items-center justify-center">

          <div className="text-6xl">
            📈
          </div>

          <h3 className="mt-5 text-xl font-semibold text-white">
            No Revenue Yet
          </h3>

          <p className="mt-2 text-slate-400">
            Create your first campaign to start tracking earnings.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold text-white">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Earnings from your affiliate campaigns
          </p>

        </div>

        <div className="rounded-lg bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
          Live
        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#6366F1"
                  stopOpacity={0.7}
                />

                <stop
                  offset="95%"
                  stopColor="#6366F1"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#334155"
            />

            <XAxis
              dataKey="name"
              stroke="#94A3B8"
            />

            <YAxis
              stroke="#94A3B8"
              tickFormatter={(v) => `₹${v}`}
            />

            <Tooltip
              contentStyle={{
                background: "#0F172A",
                border: "1px solid #334155",
                borderRadius: 12,
                color: "#fff",
              }}
             formatter={(value) => [
  `₹${Number(value).toLocaleString()}`,
  "Revenue",

              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366F1"
              fill="url(#colorRevenue)"
              strokeWidth={3}
              animationDuration={1200}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}