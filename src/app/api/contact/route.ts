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

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
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

  const { error: dbError } = await getSupabaseClient()
    .from("contact_submissions")
    .insert({ name, email, phone: phone || null, subject, message });

  if (dbError) {
    console.error("[contact] Supabase insert failed:", dbError.message);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }

  const { error: emailError } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "ODNZ Contact <noreply@donor.co.nz>",
    to: [process.env.CONTACT_EMAIL_TO ?? "info@donor.co.nz"],
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
