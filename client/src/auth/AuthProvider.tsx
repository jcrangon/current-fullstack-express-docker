// src/auth/AuthProvider.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "@/axios/axios";            // ← ton instance MONO (avec intercepteur 401)
import { User } from "@/types/auth";
import { AuthContext } from "./AuthContext"; // ← ton contexte + useAuth() déjà défini

type Props = { children: React.ReactNode };

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Au montage : vérifie la session (cookie httpOnly déjà envoyé grâce à withCredentials)
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const { data } = await api.get("/auth/me", { signal: ac.signal });
        setUser(data?.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // Connexion
  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data?.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    setUser(data.user);
  }, []);

  // Déconnexion
  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("refreshToken");
      setUser(null);
    }
  }, []);

  // Refresh manuel (optionnel, l’intercepteur 401 le fait déjà automatiquement)
  const refreshSession = useCallback(async () => {
    const refreshToken =
      typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
    if (!refreshToken) throw new Error("No refresh token found");

    const { data } = await api.post(
      "/auth/refresh",
      { refreshToken },
      { skipAuthRefresh: true } // ← ne pas intercepter cet appel
    );

    if (data?.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    if (data?.user) setUser(data.user);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      refreshSession,
    }),
    [user, loading, login, logout, refreshSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
