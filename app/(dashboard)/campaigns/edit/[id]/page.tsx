import CampaignForm from "@/components/campaigns/CampaignForm";

export default async function EditCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <CampaignForm
      mode="edit"
      campaignId={id}
    />
  );
}