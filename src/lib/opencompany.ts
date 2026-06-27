import {
  secrets,
  createBilling,
  LocalMockResolver,
} from "@opencompany/sdk";
import { resolveContext } from "./auth";

const resolver = new LocalMockResolver({
  STRIPE_KEY: {
    class: "invoke-only",
    devValue: "sk_test_local_only",
    ops: {
      checkout: ({ amount, currency }) => ({
        url: `/mock-checkout?amount=${amount}&currency=${currency ?? "usd"}`,
      }),
    },
  },
});

/**
 * Get a billing instance scoped to the current auth session.
 * Call this inside server components or route handlers — it resolves
 * the user identity from the platform session cookie.
 */
export async function getBilling() {
  const ctx = await resolveContext();
  return createBilling(resolver, ctx);
}

export { secrets };