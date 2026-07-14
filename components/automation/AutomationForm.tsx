"use client";

type Props = {
  mode: "add" | "edit";
  automationId?: string;
};

export default function AutomationForm({
  mode,
  automationId,
}: Props) {
  return (
    <div className="text-white">
      Automation Form
    </div>
  );
}