type Props = {
  trigger: string;
};

export default function TriggerBadge({
  trigger,
}: Props) {
  return (
    <span className="inline-flex rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
      {trigger}
    </span>
  );
}