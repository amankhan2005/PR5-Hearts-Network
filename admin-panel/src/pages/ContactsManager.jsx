 import React, { useEffect, useState } from "react";
import { listContacts, handleContact } from "../api/settingsService";

export default function ContactsManager({ creds }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | pending | handled
  const [processingId, setProcessingId] = useState(null);

  // For details panel
  const [selected, setSelected] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // load now returns the loaded array so callers can use it immediately
  function load() {
    setLoading(true);
    return listContacts(creds)
      .then((res) => {
        // API returns array of items
        const arr = Array.isArray(res) ? res : Array.isArray(res?.items) ? res.items : [];
        setItems(arr);
        return arr;
      })
      .catch((err) => {
        console.error(err);
        setItems([]);
        return [];
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function markHandled(id) {
    try {
      setProcessingId(id);
      await handleContact(creds, id); // sets status="closed"
      const refreshedItems = await load();
      if (selected?._id === id) {
        const refreshed = (refreshedItems ?? []).find((it) => it._id === id) || null;
        setSelected(refreshed);
      }
    } catch (err) {
      alert(err?.message || "Failed to update");
    } finally {
      setProcessingId(null);
    }
  }

  // Open details for a contact
  function openDetails(contact) {
    setSelected(contact);
    setDetailsOpen(true);
  }
  function closeDetails() {
    setDetailsOpen(false);
    setTimeout(() => setSelected(null), 150);
  }

  // Map status -> pending/handled
  const isHandled = (it) => (it?.status || "new") === "closed";
  const isPending = (it) => !isHandled(it);

  const filteredItems = (items ?? []).filter((i) => {
    if (filter === "pending") return isPending(i);
    if (filter === "handled") return isHandled(i);
    return true;
  });

  const stats = {
    total: (items ?? []).length,
    pending: (items ?? []).filter(isPending).length,
    handled: (items ?? []).filter(isHandled).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50/20 to-green-50/20 pt-24 pb-20">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-green-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-700 font-bold text-lg">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-green-50/30 pt-24 pb-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 relative animate-fadeInUp">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 rounded-[3rem] blur-3xl"></div>
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-14 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
              <div>
                <h2 className="text-5xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                  Contacts
                </h2>
                <p className="text-slate-600 font-semibold text-lg mt-1">Manage customer inquiries</p>
              </div>
            </div>

            <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border-2 border-slate-100">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  filter === "all"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  filter === "pending"
                    ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilter("handled")}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  filter === "handled"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Handled ({stats.handled})
              </button>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Contacts" value={stats.total} color="green" icon="users" delay={100} />
          <StatCard title="Pending" value={stats.pending} color="orange" icon="clock" delay={150} />
          <StatCard title="Handled" value={stats.handled} color="green" icon="check" delay={200} />
        </div>

        {/* Contacts list */}
        <div className="group relative animate-fadeInUp" style={{ animationDelay: "250ms" }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-25 transition-opacity duration-500"></div>
          <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 border-3 border-green-200">
            {filteredItems.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              <ul className="space-y-5">
                {filteredItems.map((i, index) => (
                  <li
                    key={i?._id || index}
                    onClick={() => openDetails(i)}
                    className="group/item relative bg-gradient-to-br from-white via-slate-50/50 to-white border-2 border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-green-300 transition-all duration-300 hover:scale-[1.01] animate-slideIn cursor-pointer"
                    style={{ animationDelay: `${300 + index * 50}ms` }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") openDetails(i);
                    }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full -mr-20 -mt-20 blur-3xl opacity-0 group-hover/item:opacity-30 transition-opacity duration-500"></div>

                    <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar name={i?.parentName} />
                        <div>
                          <h3 className="font-black text-slate-900 text-xl">
                            {i?.parentName || "Unknown"}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-sm text-green-700 font-semibold flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                              {i?.email || "—"}
                            </span>
                            {i?.phone && (
                              <span className="text-sm text-slate-600 font-semibold flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {i.phone}
                              </span>
                            )}
                            {i?.status && (
                              <span className="text-xs font-bold uppercase tracking-wide bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                {i.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start sm:items-end gap-2">
                        <span className="text-xs text-slate-600 font-bold bg-slate-100 px-4 py-2 rounded-xl whitespace-nowrap shadow-sm">
                          {i?.createdAt
                            ? new Date(i.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—"}
                        </span>
                        <span
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-md ${
                            isHandled(i)
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-200"
                              : "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-2 border-orange-200"
                          }`}
                        >
                          {isHandled(i) ? "✓ Handled" : "⏳ Pending"}
                        </span>
                      </div>
                    </div>

                    <div className="relative mb-0">
                      <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-100 rounded-xl p-4">
                        <p className="text-slate-700 leading-relaxed font-medium line-clamp-3">
                          {i?.message || ""}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* DETAILS DRAWER / MODAL */}
      {detailsOpen && selected && (
        <div className="fixed inset-0 z-11000 flex items-stretch">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeDetails}
            aria-hidden
          ></div>

          {/* panel */}
          <aside className="relative ml-auto w-full max-w-2xl h-full bg-white p-8 overflow-y-auto shadow-2xl rounded-l-3xl">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl">
                  {(selected?.parentName?.charAt(0) || "?").toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {selected?.parentName || "Unknown"}
                  </h3>
                  <p className="text-sm text-slate-600">{selected?.email || "—"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (!selected?._id) return;
                    markHandled(selected._id);
                  }}
                  disabled={processingId === selected?._id || isHandled(selected)}
                  className="px-4 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 shadow-md disabled:opacity-50"
                >
                  {isHandled(selected)
                    ? "Already Handled"
                    : processingId === selected?._id
                    ? "Processing..."
                    : "Mark as Handled"}
                </button>

                <button
                  onClick={closeDetails}
                  className="px-4 py-2 rounded-xl font-bold bg-slate-100 text-slate-700 border border-slate-200"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <Field label="Message" value={selected?.message || "—"} pre />
              <Field label="Phone" value={selected?.phone || "—"} />
              <Field label="Email" value={selected?.email || "—"} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Service Interest" value={selected?.serviceInterest || "—"} />
                <Field label="Preferred Contact" value={selected?.preferredContact || "—"} />
                <Field label="Best Time To Reach" value={selected?.bestTimeToReach || "—"} />
                <Field
                  label="Submitted At"
                  value={
                    selected?.createdAt
                      ? new Date(selected.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Child Name" value={selected?.childName || "—"} />
                <Field label="Child Age" value={selected?.childAge ?? "—"} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="City" value={selected?.city || "—"} />
                <Field label="State" value={selected?.state || "—"} />
                <Field label="ZIP" value={selected?.zipCode || "—"} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Lead Source" value={selected?.leadSource || "—"} />
                <Field label="Status" value={selected?.status || "—"} />
              </div>

              {selected?.utm && typeof selected.utm === "object" && (
                <div>
                  <div className="text-sm text-slate-500 uppercase tracking-wide font-black mb-2">
                    UTM
                  </div>
                  <pre className="bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-xs">
                    {JSON.stringify(selected.utm, null, 2)}
                  </pre>
                </div>
              )}

              {selected?.ipAddress && <Field label="IP Address" value={selected.ipAddress} />}
              {selected?.userAgent && <Field label="User Agent" value={selected.userAgent} pre />}
            </div>
          </aside>
        </div>
      )}

      {/* Styles */}
      <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideIn { animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

          .border-3 { border-width: 3px; }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
    </div>
  );
}

/* ----------------- Small helper components ----------------- */

function StatCard({ title, value, color = "green", icon = "users", delay = 0 }) {
  const colors = {
    green: { from: "from-green-500", to: "to-emerald-500", text: "text-green-600", border: "border-green-200" },
    orange: { from: "from-orange-500", to: "to-amber-500", text: "text-orange-600", border: "border-orange-200" },
  }[color];

  return (
    <div className="group relative animate-fadeInUp" style={{ animationDelay: `${delay}ms` }}>
      <div className={`absolute -inset-1 bg-gradient-to-r ${colors.from} ${colors.to} rounded-[2rem] blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
      <div className={`relative bg-white rounded-[2rem] p-6 border-3 ${colors.border} shadow-xl hover:shadow-2xl transition-all duration-500`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-600 uppercase tracking-wide mb-2">{title}</p>
            <p className={`text-4xl font-black ${colors.text}`}>{value}</p>
          </div>
          <div className={`w-16 h-16 bg-gradient-to-br ${colors.from} ${colors.to} rounded-2xl flex items-center justify-center shadow-xl`}>
            {icon === "users" && (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
            {icon === "clock" && (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {icon === "check" && (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name }) {
  return (
    <div className="relative flex-shrink-0">
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl blur-md opacity-50"></div>
      <div className="relative w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl">
        {(name?.charAt(0) || "?").toUpperCase()}
      </div>
    </div>
  );
}

function Field({ label, value, pre = false }) {
  return (
    <div>
      <div className="text-sm text-slate-500 uppercase tracking-wide font-black mb-2">{label}</div>
      {pre ? (
        <pre className="bg-slate-50 border-2 border-slate-100 rounded-xl p-3 text-sm whitespace-pre-wrap break-words">{value}</pre>
      ) : (
        <div className="bg-slate-50 border-2 border-slate-100 rounded-xl p-4 text-sm text-slate-700">{value}</div>
      )}
    </div>
  );
}

function EmptyState({ filter }) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center">
        <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <p className="text-slate-600 font-bold text-xl">No contacts found</p>
      <p className="text-slate-500 text-sm mt-2">
        {filter === "pending" && "No pending contacts at the moment"}
        {filter === "handled" && "No handled contacts yet"}
        {filter === "all" && "No contacts have been submitted"}
      </p>
    </div>
  );
}
