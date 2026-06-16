# Register as a Donor — Research & Design Decisions

Research conducted June 2026. Primary sources: official government registration forms and
sites for each country, peer-reviewed behavioural economics literature, HIPC 2020, NZTA.

---

## Part 1: Country-by-Country Field Analysis

### Australia — AODR (Form NH007DF, June 2025)

Fields collected: Title, family name, given names, gender, DOB, postal address, phone, email, Medicare card (optional).

Organ/tissue selection: 9 checkboxes (heart, kidneys, liver, lungs, pancreas, bone, eye tissue, heart valves, skin). Master "All" option. Can also register to donate nothing.

**Not collected:** Next of kin, religion, medical conditions, DL number, blood type.

Identity verification: Online via Medicare account (pre-verified). Paper: matched by name/DOB/address.

Legal status: Legally binding under state Transplantation and Anatomy Acts. In practice soft-binding — family objection rarely overridden.

---

### United Kingdom — NHS Organ Donor Register

Fields collected: Name, DOB, postcode + address, optional fields: email, phone, ethnicity, religion/faith preferences.

Unique: Faith/beliefs field — "I would like NHS staff to speak to my family about how donation can go ahead in line with my faith or beliefs." Only useful if the downstream clinical process can act on it.

Organ/tissue selection: "All" or specific (heart, lungs, kidneys, liver, corneas, pancreas, tissue, small bowel).

**Not collected:** NHS number, next of kin, medical conditions.

Identity verification: None at registration. Matched at point of donation by name + DOB.

Legal status: Expression of intent. Family consent always sought; family can override.

---

### Canada — Ontario (Form 3750-84E)

Fields collected: Ontario health card number + version code (primary identifier), DOB, name, address, email (optional). Minimum age 16.

Organ/tissue selection: **Exclusion model** — default is donate everything; tick what you do NOT want to donate. Organs: heart, lungs, liver, kidneys, pancreas, small intestines. Tissues: bones/tendons/ligaments, eyes/corneas, heart valves, skin, pancreas islets, connective tissue, vascular tissue. Separate choice: transplant only vs. transplant + research.

**Not collected:** Next of kin, religion, medical conditions.

Legal status: Legally binding. Health card gets donor designation.

---

### Ireland — IKA Donor Card + HSE Opt-Out Register (from June 2025)

IKA physical/digital card: Almost no data — signature + optional next-of-kin signature (as conversation prompt). No name, DOB, or organ selection on card itself. No legal weight.

HSE Opt-Out Register: PPS number required, age 18+, NZ residency 1+ year. All-or-nothing — no organ selection. Legally binding opt-out.

---

### United States — State Registries

Fields collected vary by state, typically: full name, DOB, gender, full address, email, last 4 SSN (for deduplication, not retained).

Default is consent to all. Individual exclusions available post-registration.

Most states link to DMV system — driver licence number often used as primary identifier. Texas app scans the 2D barcode on the licence to auto-populate the entire form.

Legal status: Legally binding for adults 18+ under UAGA. Family cannot override in most states.

---

## Part 2: What Fields to Collect — and What NOT to Collect

### NZ NHI Number: Do Not Collect

The National Health Index number is a unique 7-character identifier (format LLL-NNNN or LLLNNLX post-July 2022) used across the NZ health system.

**Four reasons NOT to ask for it:**

1. **No lawful basis.** The Health Information Privacy Code 2020 (HIPC 2020), Schedule 2 restricts NHI collection to defined health agencies (Health NZ, health practitioners, hospitals, ACC, NZBS, PHARMAC, MedicAlert, and their contractors). An NGO running a public donation form is not a Schedule 2 agency.

2. **No precedent.** ODNZ, NZTA, and no NZ organ donation mechanism currently uses NHI.

3. **Privacy risk.** NHI is a high-value identity anchor across the entire NZ health system. Storing it in a private NGO database without Schedule 2-level security creates disproportionate privacy risk. Privacy Act 2020 Principle 1 requires proportionate collection.

4. **Not necessary.** Name + DOB + postcode is sufficient for individual identification for this purpose. The Law Society's suggestion that a future government register *could* link to NHI was explicitly scoped to a government-operated register.

### Next of Kin: Do Not Collect (Handle Post-Registration)

Every major registry — AODR, NHS ODR, all 5 US states reviewed, Ontario, BC, Alberta, Ireland — omits next-of-kin from the registration form. This reflects deliberate policy:

- Registration records the donor's own decision. A NOK field implies co-consent is required.
- Data goes stale (relationship changes, death, estrangement).
- OPOs already have fresher NOK data from hospital admission records.
- No peer-reviewed paper or OPO guidance recommends NOK at registration.

**The right intervention:** Post-registration prompt. After successful registration, show: "The most important thing you can do now is tell your family." Optionally generate a shareable message. Do not add a NOK field.

### Fields to exclude (summary)

| Field | Reason |
|---|---|
| NHI number | No lawful basis under HIPC 2020; privacy risk |
| Next of kin name/phone | Adds friction; stale data; better as post-registration prompt |
| Medical conditions | Assessed clinically at time of death |
| Blood type | Irrelevant at registration |
| Religion/faith | Only worth collecting if ODNZ can operationalise it clinically |
| Full street address | Suburb + postcode sufficient; privacy minimisation |
| Passport/IRD number | Disproportionate privacy risk |

---

## Part 3: Behavioural Evidence — What Actually Drives Registrations

### The 80–90% / 25–60% gap

In every opt-in country, ~80–90% of adults support donation but only 25–60% are registered. The gap is friction and inertia, not attitude.

A 2024 UK study (N=1,008, PMC11135768) found: 65.5% declined when approached; 19.7% made an initial commitment but didn't follow through; only 14.8% completed registration.

### Five highest-ROI interventions (evidence quality notes included)

**1. The reciprocity message (+38% registrations, N=1,085,322)**
*"If you needed an organ transplant would you have one? If so please help others."*
Source: Sallis, Harper & Sanders (not "Hallsworth"), quasi-RCT on GOV.UK. Sequential alternation, not fully randomised. The single highest-ROI change available, verified at population scale.
**→ Include this prominently on the page and form.**

**2. Visual simplicity over field removal (+80% Ontario pilot)**
Ontario: half-page visual redesign, without removing any fields, produced 80% relative lift in registrations (4.1% → 7.4%). Sectioning, visual hierarchy, and placing decision before personal data reduces the "wall of fields" effect.
Source: Robitaille et al. 2021, Journal of Marketing.
**→ Decision question first; clear section headings; not one long list of fields.**

**3. Intercept at low-pressure moments (~3× lift, BC 2025)**
Handing forms at the welcome desk rather than at the transaction counter. The point is: don't ask people to decide under time pressure.
**→ Frame the form as "this takes 2 minutes" — reduce pressure.**

**4. Show more about donation (+14.7 pp lift)**
Listing 13 specific donatable organs/tissues on the form — more content, not less — produced a statistically significant lift. Concrete information helps; people want to know what they're agreeing to.
Source: Kessler & Roth 2025, AEJ.
**→ Show the specific organ/tissue list, don't hide it behind "see more".**

**5. Do NOT use forced yes/no framing (confirmed backfires)**
Forced yes/no choice produced near-zero change in registration rates in real-world data, despite hypothetical studies predicting a +37pp advantage. Explicit "No" also likely creates a family-consent penalty.
Source: Kessler & Roth 2025, AEJ.
**→ Allow form abandonment without recording a "No". Never require a decline.**

**6. Do NOT add images to social proof messages**
Social norms message WITH an image performed worse than no message (OR 0.94, p<0.05) in the UK GOV.UK experiment.
**→ Keep reciprocity message as clean text, no accompanying photo.**

---

## Part 4: Driver's Licence as an Optional Identifier

The South Australia evidence is the strongest argument for DL-linked registration:
- SA (only Australian state retaining licence linkage): **74% enrolment**
- Rest of Australia (AODR online/myGov): **35% enrolment**
~90% of SA registrations occur during licence applications.

The NZ NZTA channel is binary (yes/no only), not legally binding since the HTA 2008 repeal, and sits in a transport database rather than the health system. An ODNZ digital form should complement the NZTA channel, not replace it.

**Decision:** Include driver licence number as an optional field. Rationale:
- Most NZ adults have a licence
- Allows future data linkage with NZTA if a formal register is ever established
- Matches the channel most NZ donors currently use

---

## Part 5: Opt-Out Evidence

The PNAS Nexus 2025 study (6 opt-out switchers vs. 18 opt-in controls, 2000–2023):
- Deceased donors: +7%, p=0.213 — **not statistically significant**
- Living donors: -29%, p=0.026 — **significant crowding-out effect**

Wales 10-year review (Bangor University 2025): "The anticipated increase in organ donation consent rates has not materialised."

Australia increased its donation rate 41% (2009–2014) through ICU infrastructure investment (specialist donor roles, clinician training) without changing consent law. Most directly relevant model for NZ.

---

## Part 6: Recommended Field Set for ODNZ "Register as a Donor" Form

### Order (research-backed: decision first, personal data second)

**Decision (shown first):**
- Donate all organs and tissues — default, recommended
- Or choose specific organs/tissues (triggers checklist)

**Organs:** Heart, Kidneys, Liver, Lungs, Pancreas, Intestine
**Tissues:** Corneas (eyes), Heart valves, Skin, Bone and tendons

**Personal details (pre-filled from Google where possible):**
- Full name (from Google, editable)
- Email (from Google, readonly)
- Date of birth (required)
- Mobile phone (optional)

**Location (for deduplication):**
- Suburb / town (required)
- Postcode (required)

**Identity (optional):**
- Driver licence number (optional — enables future NZTA data linkage)

**Demographics (optional, for equity monitoring):**
- Ethnicity (dropdown — NZ standard ethnicities per Stats NZ)

**Consent (required):**
- I understand this is an expression of intent (not a binding legal register in NZ)
- My family will be consulted — I commit to telling them my wishes
- Privacy policy agreement

### Post-registration screen

Show prominently: "The most important thing you can do now is tell your family."
Offer a shareable message the registrant can send.

---

## Part 7: Technical Setup — Google OAuth with Supabase

### Supabase configuration required

1. Go to **Supabase Dashboard → Authentication → Providers → Google**
2. Enable Google provider
3. Copy the **Callback URL** shown (format: `https://<project-ref>.supabase.co/auth/v1/callback`)

### Google Cloud Console setup

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials
2. Create an OAuth 2.0 Client ID (Web application)
3. Add to Authorized redirect URIs:
   - `https://<project-ref>.supabase.co/auth/v1/callback` (from Supabase step above)
4. Copy the **Client ID** and **Client Secret**
5. Paste into Supabase Dashboard → Authentication → Providers → Google

### Supabase Auth URL configuration

In Supabase Dashboard → Authentication → URL Configuration:
- Site URL: `https://odnz-website.vercel.app`
- Redirect URLs (add both):
  - `https://odnz-website.vercel.app/auth/callback`
  - `http://localhost:3000/auth/callback` (for local dev)

### Environment variables required

Already set: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

Must also be set (check they match your Supabase project):
```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

**Important:** `NEXT_PUBLIC_SUPABASE_URL` must match `SUPABASE_URL` exactly (same project). If the Vercel Marketplace integration set different values, update them.

### Supabase database setup

Run this SQL in Supabase Dashboard → SQL Editor:

```sql
CREATE TABLE donor_registrations (
  id                 uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at         timestamptz DEFAULT now(),
  updated_at         timestamptz DEFAULT now(),
  user_id            uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name          text NOT NULL,
  email              text NOT NULL,
  date_of_birth      date NOT NULL,
  suburb             text NOT NULL,
  postcode           text NOT NULL,
  phone              text,
  driver_licence     text,
  ethnicity          text,
  donate_all         boolean NOT NULL DEFAULT true,
  specific_organs    text[],
  specific_tissues   text[],
  consent_intent     boolean NOT NULL DEFAULT true,
  consent_family     boolean NOT NULL DEFAULT true,
  consent_privacy    boolean NOT NULL DEFAULT false,
  UNIQUE (user_id)
);

-- Row Level Security
ALTER TABLE donor_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own registration"
  ON donor_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own registration"
  ON donor_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registration"
  ON donor_registrations FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## Sources

- [Services Australia — NH007DF form](https://www.servicesaustralia.gov.au/nh007df)
- [NHS Organ Donation — Register](https://www.organdonation.nhs.uk/register-your-decision/donate/)
- [BeADonor.ca — Ontario Form 3750-84E](https://beadonor.ca/register)
- [Donate Life America — RegisterMe.org](https://donatelife.net/donation/donor-registries/national-donate-life-registry/)
- [BC Organ Donor Registry](https://register.transplant.bc.ca/)
- [NZTA — Organ and tissue donation](https://www.nzta.govt.nz/driver-licences/getting-a-licence/organ-and-tissue-donation)
- [HIPC 2020 — NZ Privacy Commissioner](https://www.privacy.org.nz/privacy-principles/codes-of-practice/hipc2020/)
- [Health NZ — NHI guidelines](https://www.healthnz.govt.nz/health-professionals/guidance-standards/topic/health-identity/national-health-index-nhi/guidelines-for-using-the-nhi)
- [SA Premier — 74% enrolment](https://premier.sa.gov.au/media-releases/news-items/south-australia-leading-calls-for-organ-donation-to-appear-on-drivers-licences)
- [Sallis, Harper & Sanders 2018 — GOV.UK RCT N=1,085,322 (PMC6150960)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6150960/)
- [Robitaille et al. 2021 — Ontario pilot, Journal of Marketing](https://journals.sagepub.com/doi/full/10.1177/0022242921990070)
- [Kessler & Roth 2025 — Forced choice backfires (AEJ)](https://www.aeaweb.org/articles?id=10.1257%2Fpol.20220760)
- [PMC12560092 — PNAS Nexus 2025, opt-out crowding-out](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12560092/)
- [PMC11135768 — Who follows through? UK 2024](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11135768/)
- [Nation Cymru 2025 — Wales 10-year opt-out review](https://nation.cymru/news/wales-landmark-opt-out-organ-donation-law-has-had-little-impact-new-research/)
- [BC Government 2025 — Behavioural insights pilot](https://digital.gov.bc.ca/2025/02/21/behavioural-insights-organ-donors/)
