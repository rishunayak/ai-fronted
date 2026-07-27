import { createContext, useState, useEffect, useCallback, useRef } from "react";
import * as authApi from "../api/auth.js";
import { setAccessToken } from "../api/axios.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const restoreAttempted = useRef(false);

  // Restore session on mount using stored refresh token
  useEffect(() => {
    if (restoreAttempted.current) return;
    restoreAttempted.current = true;

    const restore = async () => {
      const storedRefresh = localStorage.getItem("refreshToken");
      if (!storedRefresh) { setIsLoading(false); return; }
      try {
        const res = await fetch("/api/auth/refresh-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: storedRefresh }),
        });
        if (!res.ok) throw new Error("refresh failed");
        const { data } = await res.json();
        setAccessToken(data.accessToken);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
        const me = await authApi.getMe();
        setUser(me);
      } catch {
        localStorage.removeItem("refreshToken");
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    restore();
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);
    setAccessToken(data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await authApi.register(name, email, password);
    setAccessToken(data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      const rt = localStorage.getItem("refreshToken");
      await authApi.logout(rt);
    } catch { /* ignore */ }
    setAccessToken(null);
    localStorage.removeItem("refreshToken");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
