import { useParams, Link } from "react-router-dom";
import { useTask, useTaskLogs } from "../hooks/useTasks.js";
import { TaskStatus } from "../components/tasks/TaskStatus.jsx";
import { TaskLogs } from "../components/tasks/TaskLogs.jsx";
import { Spinner } from "../components/ui/Spinner.jsx";
import { Button } from "../components/ui/Button.jsx";
import { formatDate, OPERATION_LABELS } from "../utils/format.js";

const ACTIVE = ["pending", "running"];

export default function TaskDetailPage() {
  const { id } = useParams();
  const { data: task, isLoading, error } = useTask(id);
  const isActive = task ? ACTIVE.includes(task.status) : false;
  const { data: logsData, isFetching: logsFetching } = useTaskLogs(id, isActive);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="text-center py-24 space-y-4">
        <p className="text-red-400 text-lg">Task not found or failed to load.</p>
        <Button as={Link} to="/dashboard" variant="secondary">
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const logs = Array.isArray(logsData) ? logsData : (logsData?.logs ?? []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      {/* Back */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
      >
        ← Back to Dashboard
      </Link>

      {/* Task header card */}
      <div className="rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl p-6 space-y-5">
        {/* Title + status */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-white">{task.title}</h1>
            <span className="inline-block mt-1 text-xs px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 font-medium">
              {OPERATION_LABELS[task.operationType] ?? task.operationType}
            </span>
          </div>
          <TaskStatus status={task.status} size="lg" />
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <MetaItem label="Created"   value={formatDate(task.createdAt)} />
          <MetaItem label="Started"   value={formatDate(task.startedAt)} />
          <MetaItem label="Completed" value={formatDate(task.completedAt)} />
        </div>

        {/* Input text */}
        <div>
          <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-2">Input</p>
          <div className="rounded-xl bg-black/30 border border-white/8 px-4 py-3 text-sm text-white/70 font-mono whitespace-pre-wrap break-all">
            {task.inputText}
          </div>
        </div>

        {/* Result */}
        {task.status === "success" && task.result != null && (
          <div>
            <p className="text-xs font-medium text-emerald-400/70 uppercase tracking-widest mb-2">
              ✓ Result
            </p>
            <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-300 font-mono whitespace-pre-wrap break-all">
              {String(task.result)}
            </div>
          </div>
        )}

        {/* Error */}
        {task.status === "failed" && task.error && (
          <div>
            <p className="text-xs font-medium text-red-400/70 uppercase tracking-widest mb-2">
              ✗ Error
            </p>
            <div className="rounded-xl bg-red-500/5 border border-red-500/20 px-4 py-3 text-sm text-red-300 font-mono whitespace-pre-wrap break-all">
              {task.error}
            </div>
          </div>
        )}

        {/* Running indicator */}
        {isActive && (
          <div className="flex items-center gap-3 py-2">
            <Spinner size="sm" />
            <span className="text-sm text-blue-300 animate-pulse">
              {task.status === "pending" ? "Waiting in queue…" : "Processing…"}
            </span>
          </div>
        )}
      </div>

      {/* Logs panel */}
      <div>
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">
          Processing Logs
        </h2>
        <TaskLogs logs={logs} isLoading={logsFetching} />
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Button as={Link} to="/tasks/new" variant="primary">
          Create new task
        </Button>
        <Button as={Link} to="/dashboard" variant="secondary">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-white/35 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-white/70 font-mono">{value}</span>
    </div>
  );
}
