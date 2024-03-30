"use client";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Dashboard from "@/components/dashboard";

export default withPageAuthRequired(function DashboardPage() {
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
});
