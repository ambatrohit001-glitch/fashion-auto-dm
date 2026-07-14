"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import DashboardCard from "@/components/DashboardCard";

import RevenueChart from "@/components/analytics/RevenueChart";
import TopCampaigns from "@/components/analytics/TopCampaigns";
import TopProducts from "@/components/analytics/TopProducts";
import RecentActivity from "@/components/analytics/RecentActivity";
import AIInsights from "@/components/analytics/AIInsights";
import AutomationStatus from "@/components/analytics/AutomationStatus";
export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState(0);
  const [campaigns, setCampaigns] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [sales, setSales] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const [revenueData, setRevenueData] = useState<
    { name: string; revenue: number }[]
  >([]);

  const [topCampaigns, setTopCampaigns] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
const topProductName =
  topProducts.length > 0
    ? topProducts[0].name
    : "";
  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    const [
      productsResult,
      campaignsResult,
      campaignStats,
      productsList,
      campaignsList,
    ] = await Promise.all([
      supabase
        .from("products")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("campaigns")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("campaigns")
        .select("id,name,status,clicks,sales,earnings"),

      supabase
        .from("products")
        .select("id,name,brand,price,status,created_at")
        .order("created_at", { ascending: false })
        .limit(5),

      supabase
        .from("campaigns")
        .select("id,name,status,sales,earnings,created_at")
        .order("earnings", { ascending: false })
        .limit(5),
    ]);

    setProducts(productsResult.count ?? 0);
    setCampaigns(campaignsResult.count ?? 0);

    if (campaignStats.data) {
      setClicks(
        campaignStats.data.reduce(
          (sum, c) => sum + (c.clicks ?? 0),
          0
        )
      );

      setSales(
        campaignStats.data.reduce(
          (sum, c) => sum + (c.sales ?? 0),
          0
        )
      );

      setEarnings(
        campaignStats.data.reduce(
          (sum, c) => sum + Number(c.earnings ?? 0),
          0
        )
      );

      setRevenueData(
        campaignStats.data.map((c) => ({
          name: c.name,
          revenue: Number(c.earnings ?? 0),
        }))
      );
    }

    setTopCampaigns(
      (campaignsList.data ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        revenue: Number(item.earnings ?? 0),
        sales: item.sales ?? 0,
        status: item.status,
      }))
    );

    setTopProducts(
      (productsList.data ?? []).map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: Number(item.price ?? 0),
        status: item.status,
      }))
    );

    const recent = [
      ...(productsList.data ?? []).map((p) => ({
        id: p.id,
        title: `Product: ${p.name}`,
        subtitle: "Recently added",
      })),

      ...(campaignsList.data ?? []).map((c) => ({
        id: c.id,
        title: `Campaign: ${c.name}`,
        subtitle: "Recently updated",
      })),
    ];

    setActivities(recent.slice(0, 6));

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
  icon="📦"
  change="+12% this month"
/>

<DashboardCard
  title="Campaigns"
  value={loading ? "..." : campaigns}
  icon="🚀"
  change="+8% this month"
/>

<DashboardCard
  title="Clicks"
  value={loading ? "..." : clicks}
  icon="👆"
  change="+18% this week"
/>

<DashboardCard
  title="Sales"
  value={loading ? "..." : sales}
  icon="🛒"
  change="+5% today"
/>

<DashboardCard
  title="Revenue"
  value={loading ? "..." : `₹${earnings.toLocaleString()}`}
  icon="💰"
  change="+21% this month"
/>

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <RevenueChart data={revenueData} />

<AIInsights
  revenue={earnings}
  campaigns={campaigns}
  products={products}
  topProduct={topProductName}
/>

<TopCampaigns campaigns={topCampaigns} />

<AutomationStatus
  enabled={true}
  commentsToday={0}
  messagesSent={0}
  errors={0}
/>

<TopProducts products={topProducts} />

<RecentActivity activities={activities} />

        

    

      </div>

    </div>
  );
}