"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Dashboard from "@/components/dashboard/dashboard";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <main>
      {user && (
        <>
          <Dashboard user={user} />
        </>
      )}
    </main>
  );
}
