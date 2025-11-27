 // src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary";
import "./style.css";

/* global error hooks to capture unhandled errors/promises */
window.addEventListener("error", (e) => {
  // logs to console so ErrorBoundary or devtools can show stack
  console.error("window.onerror:", e.message, e.error);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("unhandledrejection:", e.reason);
});

const rootEl = document.getElementById("root");
if (!rootEl) {
  // helpful message in console & DOM so it's obvious why nothing shows
  console.error('Root element not found. Ensure index.html contains <div id="root"></div>');
  const fallback = document.createElement("div");
  fallback.style.padding = "24px";
  fallback.style.fontFamily = "Inter, system-ui";
  fallback.innerHTML = "<h2 style='color:#b91c1c'>Root element not found</h2><div>Check <code>index.html</code> for <code>&lt;div id=\"root\"&gt;&lt;/div&gt;</code></div>";
  document.body.appendChild(fallback);
} else {
  try {
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Render error:", err);
    // show error in page
    rootEl.innerHTML = `<pre style="white-space:pre-wrap;padding:16px;background:#fff5f5;color:#111;border-radius:6px">${String(err && err.stack ? err.stack : err)}</pre>`;
  }
}
