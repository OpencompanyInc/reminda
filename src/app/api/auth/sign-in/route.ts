import { NextRequest, NextResponse } from "next/server";
import { setDevSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // In production the platform broker validates the email/OTP and sets the
    // session cookie automatically. For local dev we set it directly.
    await setDevSession({
      userId: `dev_${email.replace(/[^a-zA-Z0-9]/g, "_")}`,
      email,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}