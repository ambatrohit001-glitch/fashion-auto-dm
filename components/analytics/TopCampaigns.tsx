"use client";

export type CampaignItem = {
  id: string;
  name: string;
  revenue: number;
  sales: number;
  status: string;
};

type Props = {
  campaigns: CampaignItem[];
};

export default function TopCampaigns({
  campaigns,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Top Campaigns
      </h2>

      {campaigns.length === 0 ? (
        <p className="text-slate-400">
          No campaigns yet.
        </p>
      ) : (
        <div className="space-y-4">

          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800 p-4"
            >
              <div>
                <p className="font-semibold text-white">
                  {campaign.name}
                </p>

                <p className="text-sm text-slate-400">
                  {campaign.status}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-green-400">
                  ₹{campaign.revenue.toLocaleString()}
                </p>

                <p className="text-sm text-slate-400">
                  {campaign.sales} Sales
                </p>
              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}