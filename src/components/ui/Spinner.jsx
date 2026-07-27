export function Spinner({ size = "md", className = "" }) {
  const sizes = { sm: "w-4 h-4 border-2", md: "w-7 h-7 border-2", lg: "w-11 h-11 border-3" };
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block rounded-full border-white/20 border-t-violet-500 animate-spin ${sizes[size]} ${className}`}
    />
  );
}
