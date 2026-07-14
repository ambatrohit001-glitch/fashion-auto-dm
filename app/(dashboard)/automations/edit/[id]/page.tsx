"use client";

import { useParams } from "next/navigation";

import AutomationForm from "@/components/automation/AutomationForm";

export default function EditAutomationPage() {
  const params = useParams();

  return (
    <AutomationForm
      mode="edit"
      automationId={params.id as string}
    />
  );
}