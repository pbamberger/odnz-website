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
  return v?.replace(/[\r\n]/g, "").trim() || undefined;
}

export async function POST(req: Request) {
  try {
    const apiKey = clean(process.env.RESEND_API_KEY);
    console.log("[contact] start apiKey.len:", apiKey?.length ?? "MISSING");

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

    // --- Supabase (non-fatal) ---
    console.log("[contact] attempting db insert");
    try {
      const db = getSupabaseClient();
      const { error: dbError } = await db
        .from("contact_submissions")
        .insert({ name, email, phone: phone || null, subject, message });
      if (dbError) {
        console.error("[contact] db error:", dbError.message, dbError.code);
      } else {
        console.log("[contact] db insert ok");
      }
    } catch (err) {
      console.error("[contact] db threw:", err instanceof Error ? err.message : String(err));
    }

    // --- Resend ---
    console.log("[contact] attempting email send");
    try {
      const resend = new Resend(apiKey);
      const from = clean(process.env.RESEND_FROM) ?? "ODNZ Contact <noreply@donor.co.nz>";
      const to = [clean(process.env.CONTACT_EMAIL_TO) ?? "info@donor.co.nz"];
      const { error: emailError } = await resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `Contact form: ${subject}`,
        text: [
          "New contact form submission",
          "",
          `Name:    ${name}`,
          `Email:   ${email}`,
          `Phone:   ${phone || "Not provided"}`,
          `Subject: ${subject}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      });
      if (emailError) {
        console.error("[contact] email error:", emailError.message);
      } else {
        console.log("[contact] email sent ok");
      }
    } catch (err) {
      console.error("[contact] email threw:", err instanceof Error ? err.message : String(err));
      // non-fatal — submission already saved
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] unhandled:", err instanceof Error ? err.stack : String(err));
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
