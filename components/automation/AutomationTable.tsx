"use client";

import { Automation } from "@/types/automation";

import AutomationRow from "./AutomationRow";

type Props = {
  automations: Automation[];
  onDelete: (id: string) => void;
};

export default function AutomationTable({
  automations,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <table className="min-w-full">

        <thead className="bg-slate-800">

          <tr>

            <th className="px-5 py-4 text-left text-sm text-slate-300">
              Name
            </th>

            <th className="px-5 py-4 text-left text-sm text-slate-300">
              Description
            </th>

            <th className="px-5 py-4 text-left text-sm text-slate-300">
              Trigger
            </th>

            <th className="px-5 py-4 text-left text-sm text-slate-300">
              Status
            </th>

            <th className="px-5 py-4 text-left text-sm text-slate-300">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {automations.map((automation) => (
            <AutomationRow
              key={automation.id}
              automation={automation}
              onDelete={onDelete}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}