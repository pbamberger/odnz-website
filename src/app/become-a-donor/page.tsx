import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Become a Donor",
  description:
    "One donor can help up to 10 people. Learn how to become an organ and tissue donor in New Zealand — it takes two steps.",
  openGraph: {
    title: "Become an Organ Donor | ODNZ",
    description:
      "70 New Zealanders became donors in 2024. 400+ people are still waiting. Here's how you can help.",
  },
};

const ORGANS = [
  { name: "Kidneys", note: "One person can donate two — the most commonly transplanted organ" },
  { name: "Liver", note: "Can be split to help two recipients" },
  { name: "Heart", note: "Gives someone a second chance at life" },
  { name: "Lungs", note: "One or both lungs can be transplanted" },
  { name: "Pancreas", note: "Helps people with type 1 diabetes" },
  { name: "Intestine", note: "Rare but life-saving for some conditions" },
];

const TISSUES = [
  { name: "Corneas", note: "Restore sight — can be donated outside the ICU" },
  { name: "Heart valves", note: "Help children born with heart defects" },
  { name: "Skin", note: "Life-saving for severe burns (NZ Skin Bank, Auckland)" },
  { name: "Bone & tendons", note: "Help cancer patients and joint replacements" },
];

const CONCERNS = [
  {
    q: "Will doctors still try to save my life?",
    a: "Yes — always. The medical team treating you has one job: to save your life. The transplant team only becomes involved after all life-saving efforts have been exhausted and death has been confirmed. They are entirely separate teams.",
  },
  {
    q: "Am I too old or not healthy enough?",
    a: "There is no age limit for donation. People in their 80s and 90s have donated successfully. Very few medical conditions prevent all donation — doctors assess each case individually at the time. The only way to find out is to register your wishes and let the medical team decide.",
  },
  {
    q: "Will it affect my funeral, tangihanga, or open casket?",
    a: "No. Organ and tissue donation does not prevent an open casket, home viewing, or a marae ceremony. The surgical team treats every donor with the utmost care and respect, and any incisions are closed carefully. The body is released to the family in a timely way.",
  },
  {
    q: "Does my religion or culture allow it?",
    a: "Most major religions — including Christianity, Catholicism, Islam, Judaism, Hinduism, and Buddhism — support organ donation as an act of generosity and life. Many Māori whānau see donation as a profound expression of aroha — giving life to others. If you have specific questions, we encourage you to speak with your faith leader.",
  },
  {
    q: "Can my family override my decision?",
    a: "In New Zealand, your family is always consulted. This is exactly why telling your family your wishes is the most important step you can take. When families know their loved one wanted to donate, they support that decision almost every time. When wishes are unknown, the burden of the decision falls entirely on them at a devastating time.",
  },
  {
    q: "Do I have to donate everything?",
    a: "No. You can specify which organs and tissues you are willing to donate. Any decision — even a partial one — is far better than no decision.",
  },
  {
    q: "Is ticking my driver's licence enough?",
    a: "It helps, but it is not enough on its own. The NZTA database is not routinely accessed by ICU clinicians. The most important step is making sure your family knows your wishes. Registration records your intent; your family makes it possible.",
  },
];

const STATS = [
  { number: "70", label: "deceased donors in 2024" },
  { number: "213", label: "lives saved or transformed" },
  { number: "400+", label: "people on the waiting list today" },
  { number: "10", label: "people one donor can help" },
];

const CONVERSATION_STARTERS = [
  "\"I've decided I want to be an organ donor — I wanted you to know.\"",
  "\"If something ever happened to me, I'd want to donate my organs. Would you be okay with that?\"",
  "Send a message to the family group chat: \"I just registered as an organ donor — have you thought about it?\"",
  "Bring it up over a coffee. It doesn't have to be a heavy conversation — a few sentences is enough.",
];

export default function BecomeADonorPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-amber-600 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-200 text-sm font-semibold uppercase tracking-widest mb-4">
            Organ &amp; Tissue Donation
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            One donor.<br />Up to 10 lives changed.
          </h1>
          <p className="text-amber-100 text-xl mb-3 leading-relaxed">
            In 2024, 70 New Zealanders became donors and 213 people received a second chance at life.
          </p>
          <p className="text-amber-100 text-lg mb-10">
            Over 400 people are still waiting. Your decision matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="https://www.nzta.govt.nz/driver-licences/getting-a-licence/organ-and-tissue-donation"
              variant="outline"
            >
              Tick DONOR on your licence
            </Button>
            <Button href="#talk-to-your-family" variant="outline">
              Talk to your family
            </Button>
          </div>
          <p className="mt-6 text-amber-200 text-sm">
            Questions? Call <strong>0800 4 DONOR</strong> (0800 436 667)
          </p>
        </div>
      </section>

      {/* Two steps */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            How to become a donor in New Zealand
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            New Zealand doesn&apos;t have a standalone online register yet. There are two things you can
            do — and the first one matters most.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="relative rounded-2xl bg-amber-50 border-2 border-amber-200 p-8">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-600 text-white font-bold text-lg mb-4">
                1
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tell your family</h3>
              <p className="text-amber-700 text-sm font-semibold uppercase tracking-wide mb-3">
                The most important step
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your family is always consulted before donation proceeds. Families who know their loved
                one wanted to donate almost always honour that wish. Families who don&apos;t know carry a
                much heavier burden.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A short conversation today can make all the difference. It doesn&apos;t have to be a heavy
                discussion — just let the people close to you know what you want.
              </p>
            </div>
            {/* Step 2 */}
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-8">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white font-bold text-lg mb-4">
                2
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tick DONOR on your licence</h3>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-3">
                Records your intent
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                On question 4C of your NZTA driver&apos;s licence application or renewal, tick DONOR. The
                word will be printed on your licence and recorded in the NZTA database.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                This is an expression of your wishes — not a binding register. It works best when your
                family already knows your decision.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://www.nzta.govt.nz/driver-licences/getting-a-licence/organ-and-tissue-donation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-gray-800 text-white text-sm font-semibold hover:bg-gray-900 transition-colors"
                >
                  Update via NZTA
                </a>
                <a
                  href="tel:08008224222"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
                >
                  Call 0800 822 422
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you can donate */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">What you can donate</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Deceased donors can give organs and tissues. Living donors can give a kidney or part of
            their liver. Tissue donors can help up to 75 people.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                Organs
              </h3>
              <ul className="space-y-3">
                {ORGANS.map((o) => (
                  <li key={o.name} className="flex gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">{o.name}</span>
                      <span className="text-gray-500 text-sm"> — {o.note}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                Tissues
              </h3>
              <ul className="space-y-3">
                {TISSUES.map((t) => (
                  <li key={t.name} className="flex gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-amber-300 shrink-0" />
                    <div>
                      <span className="font-semibold text-gray-900">{t.name}</span>
                      <span className="text-gray-500 text-sm"> — {t.note}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-white border border-gray-200 p-4">
                <p className="text-sm font-semibold text-gray-800 mb-1">Living donation</p>
                <p className="text-sm text-gray-600">
                  You can donate a kidney or part of your liver while alive. In 2024, around 85 New
                  Zealanders donated a kidney to someone they loved.{" "}
                  <Link href="/contact-us" className="text-amber-700 hover:underline">
                    Contact us
                  </Link>{" "}
                  to learn more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Talk to your family */}
      <section id="talk-to-your-family" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Talk to your family
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            This single conversation is the most powerful thing you can do.
          </p>

          {/* Consent rate data */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
              <p className="text-4xl font-bold text-green-700 mb-2">82%</p>
              <p className="text-sm text-green-800 leading-snug">
                of families say <strong>yes</strong> when their loved one was registered <em>and</em>{" "}
                had told them
              </p>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
              <p className="text-4xl font-bold text-amber-700 mb-2">63%</p>
              <p className="text-sm text-amber-800 leading-snug">
                of families say <strong>yes</strong> when they <em>knew</em> their loved one wanted to
                donate — even without registration
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 text-center">
              <p className="text-4xl font-bold text-gray-600 mb-2">38%</p>
              <p className="text-sm text-gray-700 leading-snug">
                of families say <strong>yes</strong> when wishes were unknown and there was no
                registration
              </p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mb-12 -mt-8">
            Source: DonateLife Australia family consent data, verified across multiple years
          </p>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-8 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">How to start the conversation</h3>
            <ul className="space-y-4">
              {CONVERSATION_STARTERS.map((s, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="text-amber-500 font-bold shrink-0">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center text-gray-600 leading-relaxed max-w-2xl mx-auto">
            It doesn&apos;t have to be a long or heavy conversation. A few sentences is enough. The goal
            is simply that the people closest to you know what you want — so that if the moment ever
            comes, they can honour your wishes with confidence rather than uncertainty.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">New Zealand donation in 2024</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl sm:text-5xl font-bold mb-2">{s.number}</p>
                <p className="text-amber-100 text-sm leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-amber-200 text-sm mt-8">
            New Zealand had 36 deceased donors in 2013. By 2024 that number was 70 — and climbing.
            Every registered decision, every family conversation, moves these numbers.
          </p>
        </div>
      </section>

      {/* Common concerns */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Common concerns</h2>
          <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
            It&apos;s natural to have questions. Here are the ones we hear most often.
          </p>
          <div className="space-y-4">
            {CONCERNS.map((c) => (
              <details
                key={c.q}
                className="group rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors list-none">
                  <span>{c.q}</span>
                  <svg
                    className="w-5 h-5 text-gray-400 shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 pt-1 text-gray-700 leading-relaxed border-t border-gray-100 bg-gray-50">
                  {c.a}
                </div>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-gray-500 text-sm">
            More detailed answers are in our{" "}
            <Link href="/facts-and-myths/faqs" className="text-amber-700 hover:underline font-medium">
              full FAQ
            </Link>{" "}
            and{" "}
            <Link href="/facts-and-myths/myths" className="text-amber-700 hover:underline font-medium">
              myths section
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Stories CTA */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hear from those it has touched</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Behind every statistic is a family who made the call — and a recipient who got to live.
            Read their stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/stories">Read donation stories</Button>
            <Button href="/have-the-conversation-today" variant="secondary">
              Have the conversation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
