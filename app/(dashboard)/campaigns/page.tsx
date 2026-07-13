"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

import CampaignToolbar from "@/components/campaigns/CampaignToolbar";
import CampaignTable from "@/components/campaigns/CampaignTable";
import EmptyCampaigns from "@/components/campaigns/EmptyCampaigns";

export type Campaign = {
  id: string;
  name: string;
  description: string;
  instagram_url: string;
  status: string;
  clicks: number;
  sales: number;
  earnings: number;
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {
    setLoading(true);

    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setCampaigns(data || []);
    }

    setLoading(false);
  }

  async function deleteCampaign(id: string) {
    if (!confirm("Delete this campaign?")) return;

    await supabase
      .from("campaigns")
      .delete()
      .eq("id", id);

    loadCampaigns();
  }

  const filteredCampaigns = campaigns
    .filter((campaign) => {
      const matchesSearch =
        campaign.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        campaign.status === status;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sort) {
        case "A-Z":
          return a.name.localeCompare(b.name);

        case "Z-A":
          return b.name.localeCompare(a.name);

        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Campaigns
          </h1>

          <p className="text-slate-400">
            Manage all Instagram campaigns.
          </p>
        </div>

        <Link
          href="/campaigns/add"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
        >
          + Add Campaign
        </Link>

      </div>

      <CampaignToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          Loading campaigns...
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <EmptyCampaigns />
      ) : (
        <CampaignTable
          campaigns={filteredCampaigns}
          onDelete={deleteCampaign}
        />
      )}

    </div>
  );
}