"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getAutomations,
  deleteAutomation,
} from "@/services/automation/automation.service";

import { Automation } from "@/types/automation";
import AutomationStats from "@/components/automation/AutomationStats";
import AutomationTable from "@/components/automation/AutomationTable";
import EmptyAutomations from "@/components/automation/EmptyAutomations";
export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [loading, setLoading] = useState(true);
const total = automations.length;

const active = automations.filter(
  (automation) => automation.status === "active"
).length;

const inactive = automations.filter(
  (automation) => automation.status === "inactive"
).length;
  useEffect(() => {
    loadAutomations();
  }, []);

  async function loadAutomations() {
    try {
      setLoading(true);

      const data = await getAutomations();

      setAutomations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this automation?"
    );

    if (!confirmed) return;

    try {
      await deleteAutomation(id);

      loadAutomations();
    } catch (error) {
      console.error(error);
      alert("Unable to delete automation.");
    }
  }

  return (
  <div className="space-y-8">

    {/* Header */}
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Automations
        </h1>

        <p className="mt-2 text-slate-400">
          Manage all your Instagram automations.
        </p>
      </div>

      <Link
        href="/automations/add"
        className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        + Create Automation
      </Link>

    </div>

    {/* Statistics Cards */}
    <AutomationStats
      total={total}
      active={active}
      inactive={inactive}
    />

    {/* Content */}
    {loading ? (
      <p className="text-slate-400">
        Loading...
      </p>
    ) : automations.length === 0 ? (
      <EmptyAutomations />
    ) : (
      <AutomationTable
        automations={automations}
        onDelete={handleDelete}
      />
    )}

  </div>
);
}