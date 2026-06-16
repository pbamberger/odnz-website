import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const TYPE_TO_TAGS: Record<string, string[]> = {
  story: ["stories", "story"],
  healthcarePage: ["healthcare-pages", "healthcare-page"],
  page: ["pages", "page"],
};

const IMMEDIATE = { expire: 0 };

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (!process.env.SANITY_WEBHOOK_SECRET || secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const tags = body._type ? TYPE_TO_TAGS[body._type] : null;
  if (!tags) {
    // Unknown type — revalidate everything
    Object.values(TYPE_TO_TAGS).flat().forEach((t) => revalidateTag(t, IMMEDIATE));
    return NextResponse.json({ revalidated: true, tags: "all" });
  }

  tags.forEach((t) => revalidateTag(t, IMMEDIATE));
  return NextResponse.json({ revalidated: true, type: body._type, tags });
}
