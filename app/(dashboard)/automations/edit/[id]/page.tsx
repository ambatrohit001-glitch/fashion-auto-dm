import AutomationForm from "@/components/automation/AutomationForm";

export default async function EditAutomationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AutomationForm
      mode="edit"
      automationId={id}
    />
  );
}