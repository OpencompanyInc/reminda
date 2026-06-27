import "server-only";
import { secrets, getBilling } from "./opencompany";

export async function startCheckout(amountCents: number) {
  const billing = await getBilling();
  const { url } = await billing.checkout({
    amount: amountCents,
    using: secrets.STRIPE_KEY,
  });
  return url;
}