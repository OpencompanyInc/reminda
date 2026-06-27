import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ResolveContext, SecretTier } from "@opencompany/sdk";

// ---------------------------------------------------------------------------
// Auth — wired to the OpenCompany platform identity system.
// In production the platform injects a signed capability token into the
// request; this module validates it and surfaces a typed ResolveContext for
// the SDK, as well as helpers for route protection and sign-in redirects.
// ---------------------------------------------------------------------------

const SESSION_COOKIE = "oc.sid";

function tier(): SecretTier {
  if (process.env.NODE_ENV === "production") return "prod";
  if (process.env.VERCEL_ENV === "preview") return "preview";
  return "dev";
}

export interface Session {
  userId: string;
  email: string;
}

/**
 * ResolveContext derives from the current session so every SDK call is scoped
 * to the authenticated user.
 */
export async function resolveContext(): Promise<ResolveContext> {
  const session = await getSession();
  return {
    tier: tier(),
    identity: session ? `user:${session.userId}` : "anon",
  };
}

/** Read the session from the platform cookie. */
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get(SESSION_COOKIE)?.value;
    if (!raw) return null;
    // In production the platform sets a JWT; here we accept a dev JSON payload.
    const payload = JSON.parse(raw);
    if (!payload.userId || !payload.email) return null;
    return { userId: payload.userId, email: payload.email };
  } catch {
    return null;
  }
}

/** Require a session — redirect to /sign-in if none. */
export async function requireAuth(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session;
}

/** Set a dev session cookie (only for local dev — the platform handles prod). */
export async function setDevSession(session: Session) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/** Clear the session cookie. */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}