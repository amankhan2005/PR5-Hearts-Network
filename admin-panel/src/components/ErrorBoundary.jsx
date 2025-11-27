 // src/components/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ error, info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: "Inter, system-ui", color: "#111", background:"#fff" }}>
          <h2 style={{ color: "#b91c1c" }}>Admin UI crashed — debug info below</h2>
          <pre style={{ whiteSpace: "pre-wrap", background: "#fff5f5", padding: 12, borderRadius: 6, color:"#111" }}>
            {String(this.state.error && this.state.error.stack ? this.state.error.stack : this.state.error)}
          </pre>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => window.location.reload()} style={{ padding: "8px 12px", background:"#0369a1", color:"#fff", border:"none", borderRadius:6 }}>Reload</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
