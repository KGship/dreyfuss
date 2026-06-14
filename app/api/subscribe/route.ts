import { NextResponse } from "next/server";

// Stub subscribe endpoint. Validates the email and acknowledges; wire this to
// a real mailing-list provider (Buttondown, Resend audiences, etc.) in production.
export async function POST(request: Request) {
  let email = "";
  let source = "unknown";
  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim() : "";
    source = typeof body.source === "string" ? body.source : source;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required." }, { status: 422 });
  }

  // TODO: persist subscription / forward to mailing-list provider.
  console.log(`[subscribe] ${email} (via ${source})`);

  return NextResponse.json({ ok: true, message: "Welcome. Sunday will find you." });
}
