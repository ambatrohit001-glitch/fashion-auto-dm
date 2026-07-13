"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import DashboardCard from "@/components/DashboardCard";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState(0);
  const [campaigns, setCampaigns] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [sales, setSales] = useState(0);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    const [
      productsResult,
      campaignsResult,
    ] = await Promise.all([
      supabase
        .from("products")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("campaigns")
        .select("*", { count: "exact", head: true }),
    ]);

    setProducts(productsResult.count ?? 0);
    setCampaigns(campaignsResult.count ?? 0);

    const { data: campaignData } = await supabase
      .from("campaigns")
      .select("clicks,sales,earnings");

    if (campaignData) {
      setClicks(
        campaignData.reduce(
          (sum, item) => sum + (item.clicks ?? 0),
          0
        )
      );

      setSales(
        campaignData.reduce(
          (sum, item) => sum + (item.sales ?? 0),
          0
        )
      );

      setEarnings(
        campaignData.reduce(
          (sum, item) => sum + Number(item.earnings ?? 0),
          0
        )
      );
    }

    setLoading(false);
  }

  return (
    <div>

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Here's what's happening with your creator business today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

        <DashboardCard
          title="Products"
          value={loading ? "..." : products}
        />

        <DashboardCard
          title="Campaigns"
          value={loading ? "..." : campaigns}
        />

        <DashboardCard
          title="Clicks"
          value={loading ? "..." : clicks}
        />

        <DashboardCard
          title="Sales"
          value={loading ? "..." : sales}
        />

        <DashboardCard
          title="Revenue"
          value={
            loading
              ? "..."
              : `₹${earnings.toLocaleString()}`
          }
        />

      </div>

      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="text-xl font-semibold text-white">
          Recent Activity
        </h2>

        <p className="mt-4 text-slate-400">
          Analytics module coming in the next step.
        </p>

      </div>

    </div>
  );
}