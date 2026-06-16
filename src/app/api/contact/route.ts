import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getSupabaseClient } from "@/lib/supabase";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  subject: z.enum(["General", "Media", "Healthcare", "Donation"]),
  message: z.string().min(10).max(2000),
});

function clean(v: string | undefined): string | undefined {
  return v?.replace(/[\r\n]/g, "").trim();
}

export async function POST(req: Request) {
  const apiKey = clean(process.env.RESEND_API_KEY);
  console.log("[contact] resend_key_len:", apiKey?.length ?? 0);
  const resend = new Resend(apiKey);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid form data", issues: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, phone, subject, message } = result.data;

  let dbClient;
  try {
    dbClient = getSupabaseClient();
  } catch (err) {
    console.error("[contact] Supabase client init failed:", err);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }

  const { error: dbError } = await dbClient
    .from("contact_submissions")
    .insert({ name, email, phone: phone || null, subject, message });

  if (dbError) {
    console.error("[contact] Supabase insert failed:", dbError.message);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }

  const from = clean(process.env.RESEND_FROM) ?? "ODNZ Contact <noreply@donor.co.nz>";
  const to = [clean(process.env.CONTACT_EMAIL_TO) ?? "info@donor.co.nz"];

  const { error: emailError } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Contact form: ${subject}`,
    text: [
      `New contact form submission`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone || "Not provided"}`,
      `Subject: ${subject}`,
      ``,
      `Message:`,
      message,
    ].join("\n"),
  });

  if (emailError) {
    // Submission is already logged — don't fail the request
    console.error("[contact] Resend send failed:", emailError.message);
  }

  return NextResponse.json({ success: true });
}
