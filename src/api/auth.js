import api from "./axios.js";

export const register = (name, email, password) =>
  api.post("/auth/register", { name, email, password }).then((r) => r.data.data);

export const login = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data.data);

export const logout = (refreshToken) =>
  api.post("/auth/logout", { refreshToken });

export const getMe = () =>
  api.get("/auth/me").then((r) => r.data.data);
