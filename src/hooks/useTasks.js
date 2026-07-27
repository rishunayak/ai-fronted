import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as tasksApi from "../api/tasks.js";

const ACTIVE_STATUSES = ["pending", "running"];

export function useTasks() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksApi.getTasks,
    // Poll if any task is still active
    refetchInterval: (query) => {
      const list = query.state.data?.tasks ?? [];
      return list.some((t) => ACTIVE_STATUSES.includes(t.status)) ? 3000 : false;
    },
  });
  return { tasks: data?.tasks || [], isLoading, error };
}

export function useTask(id) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => tasksApi.getTask(id),
    enabled: !!id,
    refetchInterval: (query) => {
      const task = query.state.data;
      return task && ACTIVE_STATUSES.includes(task.status) ? 2000 : false;
    },
  });
}

export function useTaskLogs(id, isActive) {
  return useQuery({
    queryKey: ["task-logs", id],
    queryFn: () => tasksApi.getTaskLogs(id),
    enabled: !!id,
    refetchInterval: isActive ? 2000 : false,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
