"use client";

import { createContext, useContext } from "react";
import type { SiteSettings } from "@/src/features/settings/types";

const SettingsContext = createContext<SiteSettings | null>(null);

type SettingsProviderProps = {
  settings: SiteSettings | null;
  children: React.ReactNode;
};

export function SettingsProvider({
  settings,
  children,
}: SettingsProviderProps) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
