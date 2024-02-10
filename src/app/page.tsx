"use client";

import Portal from "@/components/portal";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return (
      <main>
        <Portal />
      </main>
    );
  }

  return;
}
