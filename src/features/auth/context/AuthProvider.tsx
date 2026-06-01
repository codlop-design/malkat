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

import { fetchCurrentUser, logout } from "@/src/features/auth/session.client";
import type { AuthUser } from "@/src/features/auth/types";
import { onAuthUnauthorized } from "@/src/lib/authUnauthorized";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthReady: boolean;
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
  const [clientUser, setClientUser] = useState<AuthUser | null | undefined>(
    undefined,
  );

  const user = initialUser ?? clientUser ?? null;
  // User is resolved on the server in root layout (getServerUser).
  const isAuthReady = true;

  const setUser = useCallback((next: AuthUser | null) => {
    setClientUser(next);
  }, []);

  const refreshUser = useCallback(async () => {
    const current = await fetchCurrentUser();
    setClientUser(current);
    return current;
  }, []);

  const logoutUser = useCallback(async () => {
    await logout();
    setClientUser(null);
  }, []);

  useEffect(() => onAuthUnauthorized(() => setClientUser(null)), []);

  const value = useMemo(
    () => ({
      user,
      isAuthReady,
      isAuthenticated: user !== null,
      setUser,
      refreshUser,
      logout: logoutUser,
    }),
    [user, isAuthReady, setUser, refreshUser, logoutUser],
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
