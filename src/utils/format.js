// Format ISO date strings
export function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export function formatRelative(iso) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return formatDate(iso);
}

export const OPERATION_LABELS = {
  uppercase: "Uppercase",
  lowercase: "Lowercase",
  reverse_string: "Reverse String",
  word_count: "Word Count",
};

export const STATUS_META = {
  pending: { label: "Pending",  color: "text-amber-400",   bg: "bg-amber-400/10",  border: "border-amber-400/30",  dot: "bg-amber-400" },
  running: { label: "Running",  color: "text-blue-400",    bg: "bg-blue-400/10",   border: "border-blue-400/30",   dot: "bg-blue-400" },
  success: { label: "Success",  color: "text-emerald-400", bg: "bg-emerald-400/10",border: "border-emerald-400/30",dot: "bg-emerald-400" },
  failed:  { label: "Failed",   color: "text-red-400",     bg: "bg-red-400/10",    border: "border-red-400/30",    dot: "bg-red-400" },
};
