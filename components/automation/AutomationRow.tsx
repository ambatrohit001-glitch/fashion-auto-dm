"use client";

import Link from "next/link";

import StatusBadge from "./StatusBadge";
import TriggerBadge from "./TriggerBadge";

import { Automation } from "@/types/automation";

type Props = {
  automation: Automation;
  onDelete: (id: string) => void;
};

export default function AutomationRow({
  automation,
  onDelete,
}: Props) {
  return (
    <tr className="border-b border-slate-800 hover:bg-slate-900/50">

      <td className="px-5 py-4 font-medium text-white">
        {automation.name}
      </td>

      <td className="px-5 py-4 text-slate-300">
        {automation.description || "-"}
      </td>

      <td className="px-5 py-4">
        <TriggerBadge
          trigger={automation.trigger_value}
        />
      </td>

      <td className="px-5 py-4">
        <StatusBadge
          status={automation.status}
        />
      </td>

      <td className="space-x-2 px-5 py-4">

        <Link
          href={`/automations/edit/${automation.id}`}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(automation.id)}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>

      </td>

    </tr>
  );
}