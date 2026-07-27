import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateTask } from "../hooks/useTasks.js";
import Input from "../components/ui/Input.jsx";
import { Button } from "../components/ui/Button.jsx";
import { OPERATION_LABELS } from "../utils/format.js";

const OPERATIONS = Object.entries(OPERATION_LABELS);

export default function NewTaskPage() {
  const navigate = useNavigate();
  const { mutateAsync: createTask } = useCreateTask();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { operationType: "uppercase" } });

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const task = await createTask(data);
      navigate(`/tasks/${task._id}`);
    } catch (err) {
      setApiError(err.response?.data?.message ?? "Failed to create task.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Create AI Task</h1>
        <p className="text-sm text-white/40 mt-1">
          Submit a text processing job and watch it run in real time.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-white/10 bg-white/4 backdrop-blur-xl p-7 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Title */}
          <Input
            id="task-title"
            label="Task title"
            placeholder="e.g. Process quarterly report"
            error={errors.title?.message}
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 100, message: "Max 100 characters" },
            })}
          />

          {/* Input text */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-input" className="text-sm font-medium text-white/70">
              Input text
            </label>
            <textarea
              id="task-input"
              rows={5}
              placeholder="Paste or type the text to process..."
              className={`w-full px-4 py-3 rounded-xl text-sm text-white bg-white/5 border transition-all duration-200 placeholder:text-white/25 outline-none resize-none focus:bg-white/8 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${errors.inputText ? "border-red-500/60" : "border-white/10"}`}
              {...register("inputText", {
                required: "Input text is required",
                minLength: { value: 2, message: "Min 2 characters" },
              })}
            />
            {errors.inputText && (
              <p className="text-xs text-red-400">{errors.inputText.message}</p>
            )}
          </div>

          {/* Operation type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/70">Operation type</label>
            <div className="grid grid-cols-2 gap-3">
              {OPERATIONS.map(([value, label]) => (
                <label
                  key={value}
                  htmlFor={`op-${value}`}
                  className="flex items-center gap-3 cursor-pointer rounded-xl border border-white/10 bg-white/3 hover:bg-white/6 hover:border-violet-500/30 p-3.5 transition-all duration-150 has-[:checked]:border-violet-500/50 has-[:checked]:bg-violet-500/10"
                >
                  <input
                    id={`op-${value}`}
                    type="radio"
                    value={value}
                    className="accent-violet-500"
                    {...register("operationType", { required: true })}
                  />
                  <div>
                    <p className="text-sm font-medium text-white/80">{label}</p>
                    <p className="text-xs text-white/35">{getOpDesc(value)}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {apiError && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {apiError}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button
              id="create-task-submit"
              type="submit"
              loading={isSubmitting}
              size="lg"
              className="flex-1"
            >
              🚀 Submit Task
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function getOpDesc(op) {
  const m = {
    uppercase: "HELLO WORLD",
    lowercase: "hello world",
    reverse_string: "dlrow olleh",
    word_count: "Count words",
  };
  return m[op] ?? "";
}
