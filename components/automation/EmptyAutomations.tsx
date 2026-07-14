"use client";

import Link from "next/link";

export default function EmptyAutomations() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">
      <h2 className="text-2xl font-bold text-white">
        No automations yet
      </h2>

      <p className="mt-3 text-slate-400">
        Create your first automation to start sending automatic Instagram DMs.
      </p>

      <Link
        href="/automations/add"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Create Automation
      </Link>
    </div>
  );
}