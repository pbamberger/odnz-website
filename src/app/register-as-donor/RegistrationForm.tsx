"use client";

import { useActionState, useState } from "react";
import { saveRegistration } from "./actions";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";

const ORGANS = [
  { id: "heart", label: "Heart" },
  { id: "kidneys", label: "Kidneys" },
  { id: "liver", label: "Liver" },
  { id: "lungs", label: "Lungs" },
  { id: "pancreas", label: "Pancreas" },
  { id: "intestine", label: "Intestine" },
];

const TISSUES = [
  { id: "corneas", label: "Corneas (eyes)" },
  { id: "heart_valves", label: "Heart valves" },
  { id: "skin", label: "Skin" },
  { id: "bone_tendons", label: "Bone and tendons" },
];

const ETHNICITIES = [
  "New Zealand European / Pākehā",
  "Māori",
  "Samoan",
  "Cook Island Māori",
  "Tongan",
  "Niuean",
  "Chinese",
  "Indian",
  "Other Pacific peoples",
  "Other Asian",
  "Other",
  "Prefer not to say",
];

interface Props {
  userName: string;
  userEmail: string;
  existing: Record<string, unknown> | null;
}

export function RegistrationForm({ userName, userEmail, existing }: Props) {
  const [state, formAction, pending] = useActionState(saveRegistration, null);
  const [donateAll, setDonateAll] = useState<boolean>(() =>
    existing ? Boolean(existing.donate_all) : true
  );

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (state?.success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Thank you, {state.name}
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Your donor preferences have been recorded. You can update them at any time by
          returning to this page.
        </p>

        {/* Tell your family — the most important next step */}
        <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-8 text-left mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Now do the most important thing
          </h3>
          <p className="text-amber-800 font-semibold mb-4">Tell your family.</p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Families who know their loved one wanted to donate say yes 82% of the time.
            Families who don&apos;t know say yes only 38% of the time. Your registration matters
            — but this conversation matters more.
          </p>
          <p className="text-gray-600 text-sm mb-5">Here&apos;s a message you can send right now:</p>
          <div className="rounded-lg bg-white border border-amber-200 p-4 text-sm text-gray-700 italic leading-relaxed mb-5">
            &ldquo;I just registered as an organ and tissue donor. If anything ever happens to me,
            I want you to know — please support that decision. It could help up to 10 people.&rdquo;
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`sms:?body=${encodeURIComponent("I just registered as an organ and tissue donor. If anything ever happens to me, I want you to know — please support that decision. It could help up to 10 people.")}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-md text-sm font-semibold hover:bg-amber-700 transition-colors"
            >
              Send via text
            </a>
            <a
              href={`mailto:?subject=My organ donor decision&body=${encodeURIComponent("I just registered as an organ and tissue donor. If anything ever happens to me, I want you to know — please support that decision. It could help up to 10 people.")}`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-amber-600 text-amber-700 rounded-md text-sm font-semibold hover:bg-amber-50 transition-colors"
            >
              Send via email
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-2">
          Also remember to tick <strong>DONOR</strong> on your NZTA driver&apos;s licence.
        </p>
        <a
          href="https://www.nzta.govt.nz/driver-licences/getting-a-licence/organ-and-tissue-donation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-amber-700 hover:underline"
        >
          Update via NZTA →
        </a>
      </div>
    );
  }

  const field = "w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Reciprocity message — highest-ROI UX intervention per Sallis et al. 2018 */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-6 py-5 mb-10">
        <p className="text-amber-900 font-semibold leading-relaxed">
          If you needed an organ transplant, would you have one?
          If so — please help others by registering your decision today.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Register your decision</h1>
          <p className="text-gray-500 text-sm mt-1">Signed in as {userEmail}</p>
        </div>
        <button onClick={signOut} className="text-xs text-gray-400 hover:text-gray-600 underline">
          Sign out
        </button>
      </div>

      {existing && (
        <div className="mb-8 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
          You already have a registration. Submitting this form will update your preferences.
        </div>
      )}

      {state?.error && (
        <div className="mb-8 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-10">

        {/* Section 1: Donation decision — shown FIRST per research */}
        <section>
          <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-1">
            Your donation decision
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            One donor can help up to 10 people. You can choose to donate all organs and
            tissues, or select specific ones.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <label className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-colors ${donateAll ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}>
              <input
                type="radio"
                name="donate_all"
                value="all"
                checked={donateAll}
                onChange={() => setDonateAll(true)}
                className="mt-0.5 accent-amber-600"
              />
              <div>
                <p className="font-semibold text-sm text-gray-900">All organs and tissues</p>
                <p className="text-xs text-gray-500 mt-0.5">Recommended — maximises lives helped</p>
              </div>
            </label>
            <label className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-colors ${!donateAll ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}>
              <input
                type="radio"
                name="donate_all"
                value="specific"
                checked={!donateAll}
                onChange={() => setDonateAll(false)}
                className="mt-0.5 accent-amber-600"
              />
              <div>
                <p className="font-semibold text-sm text-gray-900">Specific organs / tissues</p>
                <p className="text-xs text-gray-500 mt-0.5">Choose what you&apos;re comfortable with</p>
              </div>
            </label>
          </div>

          {!donateAll && (
            <div className="rounded-xl border border-gray-200 p-5 space-y-5">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Organs</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ORGANS.map((o) => (
                    <label key={o.id} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        name="organs"
                        value={o.id}
                        defaultChecked={Array.isArray(existing?.specific_organs) && (existing.specific_organs as string[]).includes(o.id)}
                        className="accent-amber-600 w-4 h-4"
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Tissues</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {TISSUES.map((t) => (
                    <label key={t.id} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        name="tissues"
                        value={t.id}
                        defaultChecked={Array.isArray(existing?.specific_tissues) && (existing.specific_tissues as string[]).includes(t.id)}
                        className="accent-amber-600 w-4 h-4"
                      />
                      {t.label}
                    </label>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Tip: Corneas can be donated outside the ICU — they&apos;re available to far more donors.
                The NZ Skin Bank (Auckland) uses skin donations as the gold standard for severe burns treatment.
              </p>
            </div>
          )}
        </section>

        {/* Section 2: Personal details */}
        <section>
          <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-4">
            Your details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="full_name" className={labelCls}>
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="name"
                defaultValue={(existing?.full_name as string) ?? userName}
                required
                className={field}
              />
            </div>
            <div>
              <label htmlFor="email_display" className={labelCls}>Email</label>
              <input
                id="email_display"
                type="email"
                value={userEmail}
                readOnly
                className={`${field} bg-gray-50 text-gray-500 cursor-not-allowed`}
              />
            </div>
            <div>
              <label htmlFor="date_of_birth" className={labelCls}>
                Date of birth <span className="text-red-500">*</span>
              </label>
              <input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                defaultValue={(existing?.date_of_birth as string) ?? ""}
                required
                className={field}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>
                Mobile phone <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                defaultValue={(existing?.phone as string) ?? ""}
                className={field}
              />
            </div>
          </div>
        </section>

        {/* Section 3: Location */}
        <section>
          <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-1">Location</h2>
          <p className="text-xs text-gray-500 mb-4">Used to deduplicate records. We don&apos;t collect your full street address.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="suburb" className={labelCls}>
                Suburb / town <span className="text-red-500">*</span>
              </label>
              <input
                id="suburb"
                name="suburb"
                type="text"
                autoComplete="address-level2"
                defaultValue={(existing?.suburb as string) ?? ""}
                required
                className={field}
              />
            </div>
            <div>
              <label htmlFor="postcode" className={labelCls}>
                Postcode <span className="text-red-500">*</span>
              </label>
              <input
                id="postcode"
                name="postcode"
                type="text"
                autoComplete="postal-code"
                defaultValue={(existing?.postcode as string) ?? ""}
                required
                maxLength={10}
                className={field}
              />
            </div>
          </div>
        </section>

        {/* Section 4 & 5: Optional fields */}
        <section>
          <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-4">
            Optional information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="driver_licence" className={labelCls}>Driver licence number</label>
              <input
                id="driver_licence"
                name="driver_licence"
                type="text"
                defaultValue={(existing?.driver_licence as string) ?? ""}
                className={field}
                placeholder="e.g. AB123456"
              />
              <p className="mt-1 text-xs text-gray-400">
                Enables future linking with NZTA records. Never shared externally.
              </p>
            </div>
            <div>
              <label htmlFor="ethnicity" className={labelCls}>Ethnicity</label>
              <select
                id="ethnicity"
                name="ethnicity"
                defaultValue={(existing?.ethnicity as string) ?? ""}
                className={field}
              >
                <option value="">Prefer not to say</option>
                {ETHNICITIES.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-400">
                Helps ODNZ monitor and address donation equity gaps.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Consent */}
        <section>
          <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-4">
            Confirmation
          </h2>
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent_intent"
                value="true"
                required
                defaultChecked={!!existing}
                className="mt-0.5 accent-amber-600 w-4 h-4 shrink-0"
              />
              <span className="text-sm text-gray-700">
                I understand that this registration records my expression of intent. In New Zealand,
                there is currently no formal legally binding register — my family will always be consulted.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent_family"
                value="true"
                required
                defaultChecked={!!existing}
                className="mt-0.5 accent-amber-600 w-4 h-4 shrink-0"
              />
              <span className="text-sm text-gray-700">
                I commit to telling my family about this decision so they can honour my wishes.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent_privacy"
                value="true"
                required
                defaultChecked={!!existing}
                className="mt-0.5 accent-amber-600 w-4 h-4 shrink-0"
              />
              <span className="text-sm text-gray-700">
                I agree to ODNZ&apos;s{" "}
                <Link href="/privacy-policy" className="text-amber-700 hover:underline" target="_blank">
                  privacy policy
                </Link>
                . My information will be stored securely and never sold or shared with third parties.
              </span>
            </label>
          </div>
        </section>

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 bg-amber-600 text-white rounded-md font-semibold hover:bg-amber-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
        >
          {pending ? "Saving…" : existing ? "Update my registration" : "Register as a donor"}
        </button>

        <p className="text-xs text-center text-gray-400">
          Your data is stored securely in New Zealand. You can update or remove your
          registration at any time by returning to this page.
        </p>
      </form>
    </div>
  );
}
