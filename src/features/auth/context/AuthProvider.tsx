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
import { onAuthUnauthorized } from "@/src/lib/authUnauthorized";

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
  }, []);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => onAuthUnauthorized(() => setUser(null)), []);

  useEffect(() => {
    if (initialUser !== null) {
      return;
    }

    let cancelled = false;

    void fetchCurrentUser().then((current) => {
      if (!cancelled && current) {
        setUser(current);
      }
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
