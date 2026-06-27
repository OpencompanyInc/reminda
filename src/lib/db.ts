import "server-only";

// ---------------------------------------------------------------------------
// Database — declared in opencompany.config as a platform-managed service.
// The platform provisions a database and injects the connection at runtime.
// This module exposes typed helpers for the app's collections.
//
// When the SDK grows a first-class `db` export, replace the inline fetchers
// below with `import { db } from "@opencompany/sdk"`.
// ---------------------------------------------------------------------------

interface Reminder {
  id: string;
  userId: string;
  title: string;
  dueAt: string;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  createdAt: string;
}

const BASE = process.env.OC_DATA_URL ?? "http://localhost:3003/data";

async function fetchData<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const db = {
  reminders: {
    async list(userId: string): Promise<Reminder[]> {
      const data = await fetchData<Reminder[]>(
        `/reminders?userId=${encodeURIComponent(userId)}`,
      );
      return data ?? [];
    },
    async create(
      userId: string,
      input: { title: string; dueAt: string },
    ): Promise<Reminder | null> {
      return fetchData<Reminder>("/reminders", {
        method: "POST",
        body: JSON.stringify({ userId, ...input }),
      });
    },
  },
  users: {
    async get(userId: string): Promise<User | null> {
      return fetchData<User>(`/users/${encodeURIComponent(userId)}`);
    },
  },
};