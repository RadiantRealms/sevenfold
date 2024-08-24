"use client";

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Dashboard from "@/components/dashboard/dashboard";
import LoadingComponent from "@/components/common/loading-component";
import ErrorMessage from "@/components/common/error-message";
import { DashboardDataType } from "../types";

export default function DashboardPage() {
  const { user } = useUser();
  const [state, setState] = useState<{
    contactCount: number;
    groupCount: number;
    isLoading: boolean;
    error: string | null;
  }>({
    contactCount: 0,
    groupCount: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const dashboardData = await fetch("/api/dashboard/");
        if (!dashboardData.ok)
          throw new Error("Failed to fetch dashboard data");

        const { contactCount, groupCount }: DashboardDataType =
          await dashboardData.json();

        setState({
          contactCount,
          groupCount,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          contactCount: 0,
          groupCount: 0,
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchData();
  }, []);

  if (state.isLoading)
    return (
      <main>
        <LoadingComponent />
      </main>
    );

  if (state.error)
    return (
      <main>
        <ErrorMessage error={state.error} />
      </main>
    );

  return (
    <main>
      {user && (
        <>
          <Dashboard
            user={user}
            dashboardData={{
              contactCount: state.contactCount,
              groupCount: state.groupCount,
            }}
          />
        </>
      )}
    </main>
  );
}
