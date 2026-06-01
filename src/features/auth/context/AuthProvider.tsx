"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AuthUser } from "@/src/features/auth/api/loginClient";
import {
  fetchCurrentUser,
  logoutUser,
} from "@/src/features/auth/api/sessionClient";
import { authDebug } from "@/src/features/auth/lib/authDebug";
import { authEvents } from "@/src/features/auth/lib/authEvents";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  refreshUser: () => Promise<AuthUser | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
  initialUser: AuthUser | null;
};

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(initialUser);

  const refreshUser = useCallback(async () => {
    const current = await fetchCurrentUser();
    setUser(current);
    return current;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    authDebug("client", "user cleared after logout");
  }, []);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    return authEvents.onUnauthorized(() => {
      authDebug("client", "401/419 — clearing user");
      setUser(null);
    });
  }, []);

  // Session cookie is HttpOnly — cannot detect via document.cookie.
  // If the server missed the user, always verify with the API (withCredentials).
  useEffect(() => {
    if (initialUser) {
      return;
    }

    let cancelled = false;

    authDebug("client", "background sync — no server user, calling /api/auth/user");

    fetchCurrentUser().then((current) => {
      if (cancelled) return;
      setUser(current);
      authDebug("client", "background sync done", {
        user: current?.name ?? null,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [initialUser]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      setUser,
      refreshUser,
      logout,
    }),
    [user, refreshUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
