// src/api/publicSettings.js

// Correct BASE URL → only /api
const API_BASE = import.meta.env.VITE_API_BASE || "https://autismpartner.onrender.com/api";

export const SERVER_BASE = API_BASE.replace("/api", ""); // this is fine

async function fetchJson(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  const text = await res.text();

  if (!res.ok) throw new Error(text);

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Correct endpoint: /settings → NOT /api/settings/settings
export async function fetchSettings() {
  return fetchJson("/settings");
}
