import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reminda",
  description: "Smart reminders, powered by OpenCompany",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Auth header — shows user state once sign-in is wired */}
        <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-3 dark:border-zinc-800">
          <Link href="/" className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Reminda
          </Link>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {session ? (
              <span>Signed in as {session.email}</span>
            ) : (
              <Link href="/sign-in" className="hover:underline">
                Sign in
              </Link>
            )}
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
