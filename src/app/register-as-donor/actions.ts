"use server";

import { createClient } from "@/lib/supabase-server";
import { getSupabaseClient } from "@/lib/supabase";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().min(2).max(120),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  suburb: z.string().min(1).max(100),
  postcode: z.string().min(4).max(10),
  phone: z.string().max(30).optional().or(z.literal("")),
  driver_licence: z.string().max(20).optional().or(z.literal("")),
  ethnicity: z.string().max(80).optional().or(z.literal("")),
  donate_all: z.coerce.boolean(),
  specific_organs: z.array(z.string()).optional(),
  specific_tissues: z.array(z.string()).optional(),
  consent_intent: z.literal("true"),
  consent_family: z.literal("true"),
  consent_privacy: z.literal("true"),
});

export async function saveRegistration(prevState: unknown, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated. Please sign in with Google first." };
  }

  const raw = {
    full_name: formData.get("full_name"),
    date_of_birth: formData.get("date_of_birth"),
    suburb: formData.get("suburb"),
    postcode: formData.get("postcode"),
    phone: formData.get("phone") ?? "",
    driver_licence: formData.get("driver_licence") ?? "",
    ethnicity: formData.get("ethnicity") ?? "",
    donate_all: formData.get("donate_all") === "all",
    specific_organs: formData.getAll("organs"),
    specific_tissues: formData.getAll("tissues"),
    consent_intent: formData.get("consent_intent"),
    consent_family: formData.get("consent_family"),
    consent_privacy: formData.get("consent_privacy"),
  };

  const result = schema.safeParse(raw);
  if (!result.success) {
    return { error: "Please check all required fields and try again.", issues: result.error.flatten().fieldErrors };
  }

  const { consent_intent: _ci, consent_family: _cf, consent_privacy: _cp, ...fields } = result.data;

  const db = getSupabaseClient();
  const { error } = await db.from("donor_registrations").upsert(
    {
      user_id: user.id,
      email: user.email!,
      ...fields,
      phone: fields.phone || null,
      driver_licence: fields.driver_licence || null,
      ethnicity: fields.ethnicity || null,
      specific_organs: fields.donate_all ? null : (fields.specific_organs ?? []),
      specific_tissues: fields.donate_all ? null : (fields.specific_tissues ?? []),
      consent_intent: true,
      consent_family: true,
      consent_privacy: true,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("[register] upsert error:", error.message);
    return { error: "Failed to save your registration. Please try again." };
  }

  return { success: true, name: fields.full_name };
}
