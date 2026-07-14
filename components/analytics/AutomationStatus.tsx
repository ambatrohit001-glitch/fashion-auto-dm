"use client";

type Props = {
  enabled: boolean;
  commentsToday: number;
  messagesSent: number;
  errors: number;
};

export default function AutomationStatus({
  enabled,
  commentsToday,
  messagesSent,
  errors,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold text-white">
          ⚡ Automation Status
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs ${
            enabled
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {enabled ? "Running" : "Stopped"}
        </span>

      </div>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span className="text-slate-400">
            Instagram Comments
          </span>

          <span className="font-semibold text-white">
            {commentsToday}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">
            Messages Sent
          </span>

          <span className="font-semibold text-white">
            {messagesSent}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">
            Errors
          </span>

          <span
            className={
              errors === 0
                ? "font-semibold text-emerald-400"
                : "font-semibold text-red-400"
            }
          >
            {errors}
          </span>
        </div>

      </div>

    </div>
  );
}