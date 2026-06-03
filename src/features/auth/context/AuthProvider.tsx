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
import { authLog } from "@/src/lib/authLog";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthReady: boolean;
  isAuthTransitioning: boolean;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null) => void;
  refreshUser: () => Promise<AuthUser | null>;
  beginAuthTransition: () => void;
  endAuthTransition: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
  initialUser: AuthUser | null;
  hasSessionCookie: boolean;
};

export function AuthProvider({
  children,
  initialUser,
  hasSessionCookie,
}: AuthProviderProps) {
  const [clientUser, setClientUser] = useState<AuthUser | null | undefined>(
    undefined,
  );
  // Ready only when the server already sent the user; otherwise wait for client fetch.
  const [isAuthReady, setIsAuthReady] = useState(initialUser !== null);
  const [isAuthTransitioning, setIsAuthTransitioning] = useState(false);

  const user =
    clientUser !== undefined ? clientUser : (initialUser ?? null);

  const beginAuthTransition = useCallback(() => {
    setIsAuthTransitioning(true);
  }, []);

  const endAuthTransition = useCallback(() => {
    setIsAuthTransitioning(false);
  }, []);

  authLog("provider", "render", {
    initialUser: initialUser?.name ?? null,
    clientUser: clientUser === undefined ? "undefined" : clientUser?.name ?? null,
    resolvedUser: user?.name ?? null,
    isAuthReady,
  });

  const setUser = useCallback((next: AuthUser | null) => {
    authLog("provider", "setUser", { name: next?.name ?? null });
    setClientUser(next);
    setIsAuthReady(true);
  }, []);

  const refreshUser = useCallback(async () => {
    authLog("provider", "refreshUser");
    const current = await fetchCurrentUser();
    setClientUser(current);
    setIsAuthReady(true);
    return current;
  }, []);

  const logoutUser = useCallback(async () => {
    await logout();
    setClientUser(null);
    setIsAuthReady(true);
    setIsAuthTransitioning(false);
  }, []);

  useEffect(() => onAuthUnauthorized(() => setClientUser(null)), []);

  useEffect(() => {
    if (initialUser !== null) {
      authLog("provider", "skip client fetch — have initialUser from server");
      return;
    }

    authLog("provider", "client fetch — no initialUser from server");
    let cancelled = false;

    void fetchCurrentUser().then((current) => {
      if (cancelled) {
        return;
      }
      authLog("provider", "client fetch done", { user: current?.name ?? null });
      setClientUser(current);
      setIsAuthReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [initialUser, hasSessionCookie]);

  const value = useMemo(
    () => ({
      user,
      isAuthReady,
      isAuthTransitioning,
      isAuthenticated: user !== null,
      setUser,
      refreshUser,
      beginAuthTransition,
      endAuthTransition,
      logout: logoutUser,
    }),
    [
      user,
      isAuthReady,
      isAuthTransitioning,
      setUser,
      refreshUser,
      beginAuthTransition,
      endAuthTransition,
      logoutUser,
    ],
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
