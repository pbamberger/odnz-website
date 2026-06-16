import type { Metadata } from "next";
import { createClient } from "@/lib/supabase-server";
import { LoginPrompt } from "./LoginPrompt";
import { RegistrationForm } from "./RegistrationForm";

export const metadata: Metadata = {
  title: "Register as a Donor",
  description:
    "Register your organ and tissue donation preferences. Takes 2 minutes. One donor can help up to 10 people.",
};

export default async function RegisterAsDonorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main id="main-content">
        <LoginPrompt error={error} />
      </main>
    );
  }

  // Fetch existing registration if any
  const { data: existing } = await supabase
    .from("donor_registrations")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const userName = user.user_metadata?.full_name ?? user.user_metadata?.name ?? "";
  const userEmail = user.email ?? "";

  return (
    <main id="main-content">
      <RegistrationForm
        userName={userName}
        userEmail={userEmail}
        existing={existing}
      />
    </main>
  );
}
