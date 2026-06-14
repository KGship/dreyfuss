import { NextResponse } from "next/server";

// Stub essay-pitch endpoint. Validates the core fields and acknowledges; wire
// this to email / a CRM / an editorial inbox in production.
export async function POST(request: Request) {
  let payload: Record<string, unknown> = {};
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Name and a valid email are required." },
      { status: 422 },
    );
  }

  // TODO: forward the pitch to the editorial inbox / submissions system.
  console.log(`[submit] pitch from ${name} <${email}>`);

  return NextResponse.json({
    ok: true,
    message: "Pitch received. We will reply within fourteen days.",
  });
}
