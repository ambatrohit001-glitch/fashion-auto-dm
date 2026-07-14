type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const active = status.toLowerCase() === "active";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-500/20 text-emerald-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {status}
    </span>
  );
}