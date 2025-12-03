 import { createContext, useContext, useEffect, useState } from "react";
import { fetchSettings } from "../api/publicSettings";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "https://pr5-hearts-network-1.onrender.com/api";
  const ROOT = API_BASE.replace("/api", ""); // final root URL → http://localhost:5000

  useEffect(() => {
    fetchSettings().then((data) => {
      if (!data || !data.global) return;

      const g = data.global;

      // ---- Safe Full URL Builder ----
      const buildURL = (filePath) => {
        if (!filePath) return "";
        const cleanPath = filePath.startsWith("/") ? filePath : "/" + filePath;
        return ROOT + cleanPath;
      };

      const fixedLogo = buildURL(g.logo);

      setSettings({
        ...g,
        logo: fixedLogo
      });
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
