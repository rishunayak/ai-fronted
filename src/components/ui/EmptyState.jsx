export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center animate-fade-up">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white/80">{title}</h3>
        {description && <p className="text-sm text-white/40 mt-1 max-w-xs">{description}</p>}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
