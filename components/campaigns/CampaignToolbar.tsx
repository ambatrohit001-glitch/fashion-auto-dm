"use client";

import CampaignSearch from "./CampaignSearch";

type CampaignToolbarProps = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
};

export default function CampaignToolbar({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
}: CampaignToolbarProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="grid gap-4 md:grid-cols-3">
        <CampaignSearch
          value={search}
          onChange={setSearch}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        >
          <option value="All">All</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        >
          <option value="Newest">Newest</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
    </div>
  );
}