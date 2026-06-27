import {
  secrets,
  createBilling,
  LocalMockResolver,
  type ResolveContext,
} from "@opencompany/sdk";

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

const ctx: ResolveContext = {
  tier: process.env.NODE_ENV === "production" ? "prod" : "dev",
  identity: "dev:local",
};

export const billing = createBilling(resolver, ctx);
export { secrets };