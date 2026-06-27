import "server-only";
import { secrets, billing } from "./opencompany";

export async function startCheckout(amountCents: number) {
  const { url } = await billing.checkout({
    amount: amountCents,
    using: secrets.STRIPE_KEY,
  });
  return url;
}