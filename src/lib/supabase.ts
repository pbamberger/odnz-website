import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

function clean(v: string | undefined): string | undefined {
  return v?.replace(/[\r\n]/g, "").trim();
}

export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    const url = clean(process.env.SUPABASE_URL);
    const key = clean(process.env.SUPABASE_SERVICE_ROLE_KEY);
    if (!url || !key) throw new Error("Supabase credentials not configured");
    console.log("[supabase] init url_len:", url.length, "key_len:", key.length);
    _client = createClient(url, key);
  }
  return _client;
}

/*
  Run this SQL in the Supabase dashboard (SQL Editor) to create the submissions table:

  CREATE TABLE contact_submissions (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at  timestamptz DEFAULT now(),
    name        text        NOT NULL,
    email       text        NOT NULL,
    phone       text,
    subject     text        NOT NULL,
    message     text        NOT NULL
  );

  Required .env.local additions:
    SUPABASE_URL=https://<project>.supabase.co
    SUPABASE_SERVICE_ROLE_KEY=eyJ...
    RESEND_FROM=ODNZ Contact <noreply@donor.co.nz>
    CONTACT_EMAIL_TO=info@donor.co.nz
*/
