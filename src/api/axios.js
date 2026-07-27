import axios from "axios";

// In-memory access token store (XSS-safe)
let _accessToken = null;

export const setAccessToken = (token) => { _accessToken = token; };
export const getAccessToken = () => _accessToken;

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: false,
});

// ── Request: attach Bearer token ──
api.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});

// ── Response: auto-refresh on 401 ──
let _refreshPromise = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        // De-duplicate concurrent refresh calls
        if (!_refreshPromise) {
          const storedRefresh = localStorage.getItem("refreshToken");
          _refreshPromise = axios
            .post("/api/auth/refresh-token", { refreshToken: storedRefresh })
            .then((r) => r.data.data)
            .finally(() => { _refreshPromise = null; });
        }
        const tokens = await _refreshPromise;
        setAccessToken(tokens.accessToken);
        if (tokens.refreshToken) {
          localStorage.setItem("refreshToken", tokens.refreshToken);
        }
        original.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return api(original);
      } catch {
        setAccessToken(null);
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
