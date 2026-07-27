import { useEffect, useRef } from "react";
import { Spinner } from "../ui/Spinner.jsx";

export function TaskLogs({ logs = [], isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs.length]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/3">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-mono font-medium text-white/60 tracking-wider">
          LIVE LOGS
        </span>
        {isLoading && <Spinner size="sm" className="ml-auto" />}
      </div>

      {/* Log lines */}
      <div className="font-mono text-xs leading-relaxed p-4 max-h-64 overflow-y-auto space-y-0.5">
        {logs.length === 0 ? (
          <p className="text-white/30 italic">Waiting for logs...</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex gap-3 hover:bg-white/3 px-1 rounded transition-colors">
              <span className="text-white/25 shrink-0 select-none">
                {new Date(log.timestamp).toLocaleTimeString("en-IN", {
                  hour: "2-digit", minute: "2-digit", second: "2-digit",
                })}
              </span>
              <span className="text-emerald-300/80">{log.message}</span>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
