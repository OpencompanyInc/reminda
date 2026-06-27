import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { startCheckout } from '@/lib/billing';

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session?.userId) {
    redirect('/sign-in');
  }

  try {
    const url = await startCheckout(1999);
    redirect(url);
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-4 text-center">
          <h1 className="text-2xl font-bold">Checkout unavailable</h1>
          <p className="text-muted-foreground">
            We couldn&apos;t start the checkout session. Please try again later.
          </p>
          <a href="/" className="inline-block px-6 py-2 rounded-md bg-primary text-primary-foreground">
            Go home
          </a>
        </div>
      </div>
    );
  }
}