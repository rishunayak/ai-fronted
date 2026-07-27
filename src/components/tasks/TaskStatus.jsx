import { STATUS_META } from "../../utils/format.js";

export function TaskStatus({ status, size = "md" }) {
  const meta = STATUS_META[status] ?? STATUS_META.pending;
  const pulse = status === "pending" || status === "running";

  const sizes = {
    sm: "text-xs px-2 py-0.5 gap-1.5",
    md: "text-xs px-3 py-1   gap-2",
    lg: "text-sm px-4 py-1.5 gap-2",
  };
  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold border ${meta.bg} ${meta.border} ${meta.color} ${sizes[size]}`}
    >
      <span
        className={`rounded-full ${meta.dot} ${dotSizes[size]} ${pulse ? "animate-pulse" : ""}`}
      />
      {meta.label}
    </span>
  );
}
