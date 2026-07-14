"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import {
  createAutomation,
  getAutomationById,
  updateAutomation,
} from "@/services/automation/automation.service";

import type { Automation } from "@/types/automation";
import type { AutomationFormValues } from "@/lib/validation/automation.schema";

type Props = {
  mode: "add" | "edit";
  automationId?: string;
};

export default function AutomationForm({
  mode,
  automationId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<AutomationFormValues>({
    name: "",
    description: "",
    trigger_type: "comment",
    trigger_value: "",
    message_template: "",
    status: "active",
    is_enabled: true,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof AutomationFormValues, string>>
  >({});

  useEffect(() => {
    if (mode === "edit" && automationId) {
      loadAutomation();
    }
  }, [automationId]);

  async function loadAutomation() {
    try {
      setLoading(true);

      const automation: Automation | null =
        await getAutomationById(automationId!);

      if (!automation) return;

      setForm({
        name: automation.name,
        description: automation.description ?? "",
        trigger_type: automation.trigger_type,
        trigger_value: automation.trigger_value,
        message_template: automation.message_template,
        status: automation.status,
        is_enabled: automation.is_enabled,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load automation.");
    } finally {
      setLoading(false);
    }
  }

  function validateForm() {
    const newErrors: Partial<
      Record<keyof AutomationFormValues, string>
    > = {};

    if (!form.name.trim()) {
      newErrors.name = "Automation name is required.";
    }

    if (!form.trigger_value.trim()) {
      newErrors.trigger_value = "Trigger value is required.";
    }

    if (!form.message_template.trim()) {
      newErrors.message_template =
        "Message template is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
  if (!validateForm()) return;

  try {
    setLoading(true);

    if (mode === "add") {
      await createAutomation(form);
    } else {
      await updateAutomation(
        automationId!,
        form
      );
    }

    alert(
      mode === "add"
        ? "Automation created successfully!"
        : "Automation updated successfully!"
    );

    router.push("/automations");
  } catch (error) {
    console.error(error);

    alert("Failed to save automation.");
  } finally {
    setLoading(false);
  }
}
return (
  <div className="mx-auto max-w-4xl">
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-8">

      <h1 className="text-3xl font-bold text-white">
        {mode === "add"
          ? "Create Automation"
          : "Edit Automation"}
      </h1>

      <p className="mt-2 text-slate-400">
        Configure your automation workflow.
      </p>

      <div className="mt-8 space-y-6">

        <Input
          label="Automation Name"
          placeholder="Instagram Auto DM"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          required
        />

        {errors.name && (
          <p className="text-sm text-red-400">
            {errors.name}
          </p>
        )}

        <Textarea
          label="Description"
          placeholder="Describe this automation..."
          value={form.description ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <Select
          label="Trigger Type"
          value={form.trigger_type}
          onChange={(e) =>
            setForm({
              ...form,
              trigger_type: e.target.value,
            })
          }
          options={[
            "comment",
            "dm",
            "story_reply",
            "keyword",
          ]}
        />

        <Input
          label="Trigger Value"
          placeholder="LINK"
          value={form.trigger_value}
          onChange={(e) =>
            setForm({
              ...form,
              trigger_value: e.target.value,
            })
          }
          required
        />

        {errors.trigger_value && (
          <p className="text-sm text-red-400">
            {errors.trigger_value}
          </p>
        )}

        <Textarea
          label="Message Template"
          placeholder="Hi 👋 Thanks for your interest. Here's your link..."
          value={form.message_template}
          onChange={(e) =>
            setForm({
              ...form,
              message_template: e.target.value,
            })
          }
          required
        />

        {errors.message_template && (
          <p className="text-sm text-red-400">
            {errors.message_template}
          </p>
        )}

        <Select
          label="Status"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value as
                | "active"
                | "inactive",
            })
          }
          options={[
            "active",
            "inactive",
          ]}
        />

        <div className="flex items-center gap-3">
          <input
            id="enabled"
            type="checkbox"
            checked={form.is_enabled}
            onChange={(e) =>
              setForm({
                ...form,
                is_enabled: e.target.checked,
              })
            }
            className="h-5 w-5"
          />

          <label
            htmlFor="enabled"
            className="text-slate-300"
          >
            Automation Enabled
          </label>
        </div>

        <div className="flex justify-end gap-4 pt-6">

          <Button
            onClick={() => router.push("/automations")}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : mode === "add"
              ? "Create Automation"
              : "Update Automation"}
          </Button>

        </div>

      </div>

    </div>
  </div>
);
  
}