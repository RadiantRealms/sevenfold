import { Auth0Provider } from "@auth0/nextjs-auth0";
import { Inter } from "next/font/google";

import { ApplicationLayout } from "@/components/common/application-layout";

import { auth0 } from "@/lib/auth0";

import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  title: "Sevenfold",
  description: "Church management software by Radiant Realms",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();

  return (
    <html
      lang="en"
      className={`${inter.className} text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950`}
    >
      <Auth0Provider user={session?.user}>
        <body>
          <ApplicationLayout>{children}</ApplicationLayout>
        </body>
      </Auth0Provider>
    </html>
  );
}
