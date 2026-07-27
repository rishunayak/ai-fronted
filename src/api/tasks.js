import api from "./axios.js";

export const createTask = (data) =>
  api.post("/tasks", data).then((r) => r.data.data);

export const getTasks = () =>
  api.get("/tasks").then((r) => r.data.data);

export const getTask = (id) =>
  api.get(`/tasks/${id}`).then((r) => r.data.data);

export const getTaskLogs = (id) =>
  api.get(`/tasks/${id}/logs`).then((r) => r.data.data);
