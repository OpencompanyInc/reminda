// app/checkout/page.tsx
import { startCheckout } from "@/lib/billing";

export default async function CheckoutPage() {
  const url = await startCheckout(1999);
  return (
    <a href={url} className="btn">
      Pay $19.99
    </a>
  );
}