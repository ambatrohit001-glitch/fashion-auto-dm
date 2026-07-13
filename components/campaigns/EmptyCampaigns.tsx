"use client";

import Link from "next/link";

export default function EmptyCampaigns() {
  return (
    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">

      <h2 className="text-2xl font-bold text-white">
        No Campaigns Yet
      </h2>

      <p className="mt-3 text-slate-400">
        Create your first Instagram campaign.
      </p>

      <Link
        href="/campaigns/add"
        className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
      >
        + Create Campaign
      </Link>

    </div>
  );
}