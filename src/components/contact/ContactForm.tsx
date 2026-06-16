"use client";

import { useState } from "react";

const SUBJECTS = ["General", "Media", "Healthcare", "Donation"] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const EMPTY: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm(EMPTY);
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-green-800 font-semibold text-lg mb-1">Message sent</p>
        <p className="text-green-700 text-sm">Thanks for getting in touch — we&apos;ll be in contact soon.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-green-700 underline hover:text-green-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = "w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";
  const label = "block text-sm font-medium text-gray-700 mb-1";
  const err = "mt-1 text-xs text-red-600";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={label}>Name <span className="text-red-500">*</span></label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            className={field}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            aria-describedby={errors.name ? "cf-name-err" : undefined}
          />
          {errors.name && <p id="cf-name-err" className={err}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Email <span className="text-red-500">*</span></label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
          />
          {errors.email && <p id="cf-email-err" className={err}>{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-phone" className={label}>Phone <span className="text-gray-400 font-normal">(optional)</span></label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            className={field}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="cf-subject" className={label}>Subject <span className="text-red-500">*</span></label>
          <select
            id="cf-subject"
            className={field}
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            aria-describedby={errors.subject ? "cf-subject-err" : undefined}
          >
            <option value="">Select a subject…</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.subject && <p id="cf-subject-err" className={err}>{errors.subject}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>Message <span className="text-red-500">*</span></label>
        <textarea
          id="cf-message"
          rows={5}
          className={field}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
        />
        {errors.message && <p id="cf-message-err" className={err}>{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="px-6 py-2.5 bg-amber-600 text-white rounded-md font-medium hover:bg-amber-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
