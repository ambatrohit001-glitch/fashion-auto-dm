"use client";

type Activity = {
  id: string;
  title: string;
  subtitle: string;
};

type Props = {
  activities: Activity[];
};

export default function RecentActivity({
  activities,
}: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-slate-400">
          No recent activity.
        </p>
      ) : (
        <div className="space-y-4">

          {activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-lg border border-slate-800 bg-slate-800 p-4"
            >
              <p className="font-medium text-white">
                {activity.title}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {activity.subtitle}
              </p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}