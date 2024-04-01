"use client";

import { redirect } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Portal from "@/components/portal";

export default function PortalPage() {
  const { user } = useUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main>
      <Portal />
    </main>
  );
}
