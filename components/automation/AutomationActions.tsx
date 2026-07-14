"use client";

import { useState } from "react";

type Props = {
  mode: "add" | "edit";
  automationId?: string;
};

export default function AutomationForm({
  mode,
}: Props) {
  const [loading, setLoading] = useState(false);

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

        <div className="mt-8 space-y-8">

          {/* Automation Details */}

          {/* Trigger */}

          {/* Message */}

          {/* Settings */}

        </div>

      </div>

    </div>
  );
}