 // src/components/ContactForm.jsx
import React, { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Heart } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

const SERVICE_OPTIONS = [
  "Respite Care (RC)",
  "Individual Support Services (ISS)",
  "Family Consultation (FC)",
  "General Support Inquiry",
  "Other",
];

const LEAD_SOURCES = ["Website", "Google Search", "Facebook", "Referral", "Other"];
const PREFERRED_CONTACTS = ["Call", "Email", "Text", "WhatsApp"];

function getUtmFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      campaign: params.get("utm_campaign") || "",
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
    };
  } catch {
    return { campaign: "", source: "", medium: "" };
  }
}

export default function ContactForm({ apiEndpoint = "/api/contact/save" }) {
  const { settings } = useSettings();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL?.trim() || "";

  const finalEndpoint = BACKEND_URL
    ? `${BACKEND_URL.replace(/\/$/, "")}${apiEndpoint}`
    : apiEndpoint;

  // Contact defaults
  const defaultAddress = "4919 Harford road Baltimore md 21214";
  const defaultPhone = "+1 (443) 992-2299";
  const defaultEmail = "info@pr5-heartsnetwork.com";

  const HOSPITAL_ADDRESS = settings?.address || defaultAddress;
  const CLINIC_PHONE = settings?.phone || defaultPhone;
  const CONTACT_EMAIL = settings?.email || defaultEmail;
  const HOSPITAL_MAP_LINK =
    settings?.mapLink ||
    `https://maps.google.com/?q=${encodeURIComponent(HOSPITAL_ADDRESS)}`;

  const [form, setForm] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    city: "",
    state: "",
    zipCode: "",
    message: "",
    serviceInterest: SERVICE_OPTIONS[0],
    preferredContact: PREFERRED_CONTACTS[0],
    bestTimeToReach: "",
    leadSource: LEAD_SOURCES[0],
    utm: getUtmFromUrl(),
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setForm((f) => ({ ...f, utm: getUtmFromUrl() }));
  }, []);

  // VALIDATION
  function validate() {
    const e = {};
    if (!form.parentName.trim()) e.parentName = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!/^[+0-9()\-.\s]{7,}$/.test(form.phone))
      e.phone = "Please enter a valid phone number.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }

  // SUBMIT HANDLER
  async function handleSubmit() {
    setErrors({});
    setServerError("");
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    setLoading(true);
    try {
      const res = await fetch(finalEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userAgent: navigator.userAgent }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(data.message || "Server error. Please try again.");
        setSuccess(false);
      } else {
        setSuccess(true);
        setForm({
          parentName: "",
          email: "",
          phone: "",
          childName: "",
          childAge: "",
          city: "",
          state: "",
          zipCode: "",
          message: "",
          serviceInterest: SERVICE_OPTIONS[0],
          preferredContact: PREFERRED_CONTACTS[0],
          bestTimeToReach: "",
          leadSource: LEAD_SOURCES[0],
          utm: getUtmFromUrl(),
        });
      }
    } catch {
      setServerError("Network error. Please try again later.");
      setSuccess(false);
    }
    setLoading(false);
  }

  // RESET FORM
  function handleReset() {
    setForm({
      parentName: "",
      email: "",
      phone: "",
      childName: "",
      childAge: "",
      city: "",
      state: "",
      zipCode: "",
      message: "",
      serviceInterest: SERVICE_OPTIONS[0],
      preferredContact: PREFERRED_CONTACTS[0],
      bestTimeToReach: "",
      leadSource: LEAD_SOURCES[0],
      utm: getUtmFromUrl(),
    });
    setErrors({});
    setSuccess(null);
  }

  // UI — PROFESSIONAL REDESIGN
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full shadow-lg mb-6">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Contact Our Support Team
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            We’re here to answer your questions, guide you through available services,
            and help your family get the support you need.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* CONTACT CARDS (LEFT) */}
          <div className="space-y-6">

            {/* PHONE CARD */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                  <p className="text-sm text-gray-500">Mon–Sun, 8 AM – 8 PM</p>
                  <p className="text-green-600 font-semibold mt-2">
                    <a href={`tel:${CLINIC_PHONE}`}>{CLINIC_PHONE}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* EMAIL CARD */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                  <p className="text-sm text-gray-500">We typically respond within 12–24 hours</p>
                  <a className="text-green-600 font-semibold mt-2 inline-block">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* LOCATION CARD */}
            <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                  <p className="text-sm text-gray-500">Our Towson location</p>
                  <a
                    href={HOSPITAL_MAP_LINK}
                    className="text-green-600 font-semibold mt-2 block"
                    target="_blank"
                  >
                    {HOSPITAL_ADDRESS}
                  </a>
                </div>
              </div>
            </div>

            {/* FAST RESPONSE */}
            <div className="bg-green-600 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6" />
                <h3 className="font-semibold text-lg">Fast Response</h3>
              </div>
              <p className="text-green-50 leading-relaxed">
                Our team typically responds within a few hours.  
                We're committed to helping your family get support quickly.
              </p>
            </div>

          </div>

          {/* PROFESSIONAL FORM (RIGHT) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">

              {/* SUCCESS MESSAGE */}
              {success === true && (
                <div className="mb-8 p-6 bg-green-50 border-l-4 border-green-600 rounded-xl shadow-sm">
                  <CheckCircle className="text-green-600 w-6 h-6 mb-1" />
                  <p className="text-green-700 font-medium">
                    Thank you! Our team will reach out shortly.
                  </p>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {success === false && serverError && (
                <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-600 rounded-xl shadow-sm">
                  <p className="text-red-700 font-medium">{serverError}</p>
                </div>
              )}

              {/* FORM SECTIONS */}
              <div className="space-y-10">

                {/* PARENT INFO */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Parent / Guardian Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">

                    {/* NAME */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">Full Name *</label>
                      <input
                        value={form.parentName}
                        onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-green-500 transition ${
                          errors.parentName ? "border-red-400 bg-red-50" : "border-gray-200"
                        }`}
                        placeholder="Your name"
                      />
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-green-500 transition ${
                          errors.email ? "border-red-400 bg-red-50" : "border-gray-200"
                        }`}
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* PHONE */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone *</label>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-green-500 transition ${
                          errors.phone ? "border-red-400 bg-red-50" : "border-gray-200"
                        }`}
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    {/* CONTACT METHOD */}
                    <div>
                      <label className="text-sm font-medium text-gray-700">Preferred Contact</label>
                      <select
                        value={form.preferredContact}
                        onChange={(e) => setForm({ ...form, preferredContact: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500"
                      >
                        {PREFERRED_CONTACTS.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                {/* CHILD INFO */}
                <section className="border-t pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Individual Information
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <input
                        value={form.childName}
                        onChange={(e) => setForm({ ...form, childName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500"
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Age</label>
                      <input
                        value={form.childAge}
                        onChange={(e) => setForm({ ...form, childAge: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., 10"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Service Interested In</label>
                      <select
                        value={form.serviceInterest}
                        onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500"
                      >
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                {/* LOCATION */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <input
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                    <input
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500"
                      placeholder="State"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                    />
                    <input
                      className={`px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-green-500 ${
                        errors.zipCode ? "border-red-400 bg-red-50" : "border-gray-200"
                      }`}
                      placeholder="ZIP"
                      value={form.zipCode}
                      onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                    />
                  </div>
                </section>

                {/* MESSAGE */}
                <section className="border-t pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Tell Us About Your Needs
                  </h3>

                  <textarea
                    className={`w-full rounded-xl px-4 py-4 border-2 h-32 focus:ring-2 focus:ring-green-500 ${
                      errors.message ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                    placeholder="Share details about the type of support you’re seeking..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </section>

                {/* EXTRA INFO */}
                <section>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500"
                      placeholder="Best time to reach you"
                      value={form.bestTimeToReach}
                      onChange={(e) => setForm({ ...form, bestTimeToReach: e.target.value })}
                    />

                    <select
                      className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500"
                      value={form.leadSource}
                      onChange={(e) => setForm({ ...form, leadSource: e.target.value })}
                    >
                      {LEAD_SOURCES.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </section>

                {/* SUBMIT */}
                <section className="pt-6 border-t">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
                    >
                      Reset
                    </button>

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="px-8 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition w-full sm:w-auto"
                    >
                      {loading ? "Sending..." : "Submit"}
                    </button>
                  </div>
                </section>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
