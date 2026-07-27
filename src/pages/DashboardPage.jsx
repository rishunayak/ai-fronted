import { Link } from "react-router-dom";
import { useTasks } from "../hooks/useTasks.js";
import { TaskCard } from "../components/tasks/TaskCard.jsx";
import { EmptyState } from "../components/ui/EmptyState.jsx";
import { Spinner } from "../components/ui/Spinner.jsx";
import { Button } from "../components/ui/Button.jsx";
import { useAuth } from "../hooks/useAuth.js";

const STATUS_CONFIGS = [
  { key: "total",   label: "Total",   color: "from-violet-600/30 to-violet-800/10", border: "border-violet-500/20", text: "text-violet-300"  },
  { key: "pending", label: "Pending", color: "from-amber-600/20  to-amber-800/10",  border: "border-amber-500/20",  text: "text-amber-300"   },
  { key: "running", label: "Running", color: "from-blue-600/20   to-blue-800/10",   border: "border-blue-500/20",   text: "text-blue-300"    },
  { key: "success", label: "Success", color: "from-emerald-600/20 to-emerald-800/10",border:"border-emerald-500/20",text: "text-emerald-300"  },
  { key: "failed",  label: "Failed",  color: "from-red-600/20    to-red-800/10",    border: "border-red-500/20",    text: "text-red-300"     },
];

function StatCard({ config, count }) {
  return (
    <div className={`rounded-2xl border ${config.border} bg-gradient-to-br ${config.color} p-5 flex flex-col gap-1`}>
      <span className="text-xs font-medium text-white/50 uppercase tracking-widest">{config.label}</span>
      <span className={`text-3xl font-bold ${config.text}`}>{count}</span>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, isLoading, error } = useTasks();

  const stats = {
    total:   tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    running: tasks.filter((t) => t.status === "running").length,
    success: tasks.filter((t) => t.status === "success").length,
    failed:  tasks.filter((t) => t.status === "failed").length,
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Good {getGreeting()},{" "}
            <span className="text-violet-400">{user?.name?.split(" ")[0] ?? "there"}</span> 👋
          </h1>
          <p className="text-sm text-white/40 mt-1">Here's an overview of all your AI tasks.</p>
        </div>
        <Button as={Link} to="/tasks/new" id="new-task-btn" size="md">
          <span className="text-lg leading-none">+</span>
          New Task
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {STATUS_CONFIGS.map((cfg) => (
          <StatCard key={cfg.key} config={cfg} count={stats[cfg.key]} />
        ))}
      </div>

      {/* Task list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white/80">Recent Tasks</h2>
          {isLoading && <Spinner size="sm" />}
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            Failed to load tasks. Please refresh.
          </div>
        )}

        {!isLoading && !error && tasks.length === 0 && (
          <EmptyState
            icon="🤖"
            title="No tasks yet"
            description="Submit your first AI task to get started."
            action={
              <Button as={Link} to="/tasks/new">
                Create your first task
              </Button>
            }
          />
        )}

        <div className="grid gap-3">
          {[...tasks]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}
