"use client";

type Campaign = {
  id: string;
  name: string;
  description: string;
  instagram_url: string;
  status: string;
  clicks: number;
  sales: number;
  earnings: number;
};

type CampaignTableProps = {
  campaigns: Campaign[];
  onDelete: (id: string) => void;
};

export default function CampaignTable({
  campaigns,
}: CampaignTableProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-xl font-bold text-white">
        Campaigns
      </h2>

      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="mb-4 rounded-lg border border-slate-700 p-4"
        >
          <h3 className="font-semibold text-white">
            {campaign.name}
          </h3>

          <p className="text-slate-400">
            {campaign.description}
          </p>
        </div>
      ))}

    </div>
  );
}