import { Link } from "react-router-dom";
import { TaskStatus } from "./TaskStatus.jsx";
import { formatRelative, OPERATION_LABELS } from "../../utils/format.js";

export function TaskCard({ task }) {
  return (
    <Link
      to={`/tasks/${task._id}`}
      className="group block rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-violet-500/30 transition-all duration-200 hover:shadow-lg hover:shadow-violet-900/20 p-5"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white/90 truncate group-hover:text-white transition-colors">
            {task.title}
          </h3>
          <p className="text-xs text-white/40 mt-0.5 truncate">{task.inputText}</p>
        </div>
        {/* Status */}
        <TaskStatus status={task.status} />
      </div>

      <div className="flex items-center gap-3 mt-4 flex-wrap">
        {/* Operation badge */}
        <span className="text-xs px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 font-medium">
          {OPERATION_LABELS[task.operationType] ?? task.operationType}
        </span>
        {/* Time */}
        <span className="text-xs text-white/30 ml-auto">
          {formatRelative(task.createdAt)}
        </span>
      </div>
    </Link>
  );
}
