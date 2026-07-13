type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  let bgColor = "bg-slate-500";

  switch (status?.toLowerCase()) {
    case "active":
      bgColor = "bg-green-600";
      break;

    case "draft":
      bgColor = "bg-yellow-500";
      break;

    case "archived":
      bgColor = "bg-red-600";
      break;
  }

  return (
    <span
      className={`${bgColor} rounded-full px-3 py-1 text-xs font-semibold text-white`}
    >
      {status}
    </span>
  );
}