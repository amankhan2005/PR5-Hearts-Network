 // src/pages/CareersManager.jsx
import React, { useEffect, useState } from "react";
import { fetchApplications, deleteApplication, downloadResume, fetchCareers, createJob, deleteJob } from "../api/settingsService";

export default function CareersManager({ creds }) {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", location: "", type: "Full-time", description: "", requirements: "", active: true });
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [activeTab, setActiveTab] = useState("applications"); // applications or jobs

  async function loadJobs() {
    try {
      const j = await fetchCareers();
      setJobs(Array.isArray(j) ? j : (j.jobs || []));
    } catch (err) {
      console.error("loadJobs:", err);
    }
  }

  async function loadApplications() {
    setError("");
    setLoading(true);
    try {
      const data = await fetchApplications(creds);
      const list = (data && data.applications) || [];
      setApps(list);
    } catch (err) {
      console.error("fetchApplications:", err);
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this application? This will remove the resume file too.")) return;
    try {
      setProcessingId(id);
      await deleteApplication(creds, id);
      await loadApplications();
    } catch (err) {
      alert("Delete failed: " + (err.message || err));
    } finally {
      setProcessingId(null);
    }
  }

  async function handleDownload(app) {
    try {
      setProcessingId(app._id);
      const { blob, filename } = await downloadResume(creds, app._id);
      const suggested = filename || (app.resume && app.resume.originalName) || `resume-${app._id}.pdf`;

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = suggested;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed: " + (err.message || err));
    } finally {
      setProcessingId(null);
    }
  }

  async function createNewJob() {
    try {
      await createJob(creds, form);
      setForm({ title: "", location: "", type: "Full-time", description: "", requirements: "", active: true });
      await loadJobs();
      alert("Job created successfully!");
    } catch (err) {
      alert(err.message || err);
    }
  }

  async function removeJob(id) {
    if (!confirm("Delete job?")) return;
    try {
      setProcessingId(id);
      await deleteJob(creds, id);
      await loadJobs();
    } catch (err) {
      alert(err.message || err);
    } finally {
      setProcessingId(null);
    }
  }

  if (loading && apps.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-orange-50/20 to-green-50/20 pt-24 pb-20">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-orange-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-700 font-bold text-lg">Loading careers data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-green-50/30 pt-24 pb-20 px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Premium Header */}
        <div className="relative mb-10 animate-fadeInUp">
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 via-green-500/10 to-orange-500/10 rounded-[3rem] blur-3xl"></div>
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-14 bg-gradient-to-b from-orange-600 to-green-600 rounded-full"></div>
              <div>
                <h2 className="text-5xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                  Careers
                </h2>
                <p className="text-slate-600 font-semibold text-lg mt-1">Manage applications and job openings</p>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-lg border-2 border-slate-100">
              <button
                onClick={() => setActiveTab("applications")}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === "applications"
                    ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Applications ({apps.length})
              </button>
              <button
                onClick={() => setActiveTab("jobs")}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === "jobs"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Job Openings ({jobs.length})
              </button>
            </div>
          </div>
        </div>

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="group relative animate-fadeInUp" style={{animationDelay: '100ms'}}>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-25 transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 border-3 border-orange-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-orange-600 to-amber-600 rounded-full"></div>
                  Latest Applications
                </h3>
                <div className="px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 text-sm font-black rounded-2xl border-2 border-orange-200 shadow-md">
                  {apps.length} Total
                </div>
              </div>

              {error ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-3xl flex items-center justify-center">
                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-red-600 font-bold text-lg">Error: {error}</p>
                </div>
              ) : apps.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-600 font-bold text-xl">No applications yet</p>
                  <p className="text-slate-500 text-sm mt-2">Applications will appear here once submitted</p>
                </div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-orange-50 to-amber-50 border-b-2 border-orange-200">
                        <th className="py-4 px-4 text-left font-black text-slate-700 uppercase tracking-wide text-xs">Name</th>
                        <th className="py-4 px-4 text-left font-black text-slate-700 uppercase tracking-wide text-xs">Email</th>
                        <th className="py-4 px-4 text-left font-black text-slate-700 uppercase tracking-wide text-xs">Phone</th>
                        <th className="py-4 px-4 text-left font-black text-slate-700 uppercase tracking-wide text-xs">Location</th>
                        <th className="py-4 px-4 text-left font-black text-slate-700 uppercase tracking-wide text-xs">Applied</th>
                        <th className="py-4 px-4 text-left font-black text-slate-700 uppercase tracking-wide text-xs">Resume</th>
                        <th className="py-4 px-4 text-left font-black text-slate-700 uppercase tracking-wide text-xs">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apps.map((a, index) => (
                        <tr key={a._id} className="border-b border-slate-100 hover:bg-orange-50/30 transition-colors duration-200 animate-slideIn" style={{animationDelay: `${200 + index * 30}ms`}}>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-black shadow-md flex-shrink-0">
                                {a.fullName.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-bold text-slate-900">{a.fullName}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <a href={`mailto:${a.email}`} className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                              {a.email}
                            </a>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-semibold text-slate-700">{a.phone}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-semibold text-slate-600">{a.city}{a.state ? `, ${a.state}` : ""}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                              {new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {a.resume?.originalName ? (
                              <button 
                                onClick={() => handleDownload(a)} 
                                disabled={processingId === a._id}
                                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-xs hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                              >
                                {processingId === a._id ? (
                                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                )}
                                Download
                              </button>
                            ) : (
                              <span className="text-xs text-slate-400 font-semibold">No file</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <button 
                              onClick={() => handleDelete(a._id)} 
                              disabled={processingId === a._id}
                              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-xs hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="grid lg:grid-cols-2 gap-8 animate-fadeInUp" style={{animationDelay: '100ms'}}>
            {/* Job Openings List */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-25 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 border-3 border-green-200 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
                    Job Openings
                  </h3>
                  <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-black rounded-2xl border-2 border-green-200 shadow-md">
                    {jobs.length} Active
                  </div>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {jobs.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center">
                        <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-slate-600 font-bold text-lg">No job openings</p>
                      <p className="text-slate-500 text-sm mt-2">Create your first job opening</p>
                    </div>
                  ) : (
                    jobs.map((j, index) => (
                      <div key={j._id} className="group/item bg-gradient-to-br from-white via-green-50/30 to-white border-2 border-green-100 rounded-2xl p-6 hover:shadow-lg hover:border-green-300 transition-all duration-300 animate-slideIn" style={{animationDelay: `${200 + index * 50}ms`}}>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-black text-slate-900 text-lg mb-2">{j.title}</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg border border-green-200 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {j.location}
                              </span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg border border-blue-200">
                                {j.type}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg whitespace-nowrap ml-3">
                            {new Date(j.postedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed mb-4 line-clamp-2">{j.description}</p>
                        <button 
                          onClick={() => removeJob(j._id)} 
                          disabled={processingId === j._id}
                          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-sm hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
                        >
                          {processingId === j._id ? "Deleting..." : "Delete Job"}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Create Job Form */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-green-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-25 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 border-3 border-orange-200 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-orange-600 to-green-600 rounded-full"></div>
                  <h3 className="text-2xl font-black text-slate-900">Create Job Opening</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Job Title</label>
                    <input
                      className="w-full border-2 border-slate-200 p-4 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 font-semibold text-slate-700 outline-none"
                      placeholder="e.g. Senior ABA Therapist"
                      value={form.title}
                      onChange={e => setForm({...form, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Location</label>
                    <input
                      className="w-full border-2 border-slate-200 p-4 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 font-semibold text-slate-700 outline-none"
                      placeholder="e.g. New York, NY"
                      value={form.location}
                      onChange={e => setForm({...form, location: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Job Type</label>
                    <select
                      className="w-full border-2 border-slate-200 p-4 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 font-semibold text-slate-700 outline-none"
                      value={form.type}
                      onChange={e => setForm({...form, type: e.target.value})}
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Intern</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Description</label>
                    <textarea
                      className="w-full border-2 border-slate-200 p-4 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 font-semibold text-slate-700 outline-none min-h-[100px] resize-none"
                      placeholder="Job description..."
                      value={form.description}
                      onChange={e => setForm({...form, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Requirements</label>
                    <textarea
                      className="w-full border-2 border-slate-200 p-4 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 font-semibold text-slate-700 outline-none min-h-[100px] resize-none"
                      placeholder="Job requirements..."
                      value={form.requirements}
                      onChange={e => setForm({...form, requirements: e.target.value})}
                    />
                  </div>

                  <button
                    onClick={createNewJob}
                    className="group/btn relative w-full overflow-hidden px-8 py-4 rounded-2xl font-black text-lg text-white transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl mt-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-green-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-orange-600 to-green-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Job Opening
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style>
        {`
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
          .animate-slideIn {
            animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }

          .border-3 {
            border-width: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #fb923c, #f59e0b);
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: padding-box;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #ea580c, #d97706);
            background-clip: padding-box;
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
}