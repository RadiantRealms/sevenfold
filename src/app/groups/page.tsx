"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsTable from "@/components/groups/groups-table";
import Typography from "@mui/material/Typography";
import LoadingComponent from "@/components/common/loading-component";
import ErrorMessage from "@/components/common/error-message";
import { GroupType } from "@/app/types";

export default function GroupsPage() {
  const [state, setState] = useState<{
    groups: GroupType[];
    isLoading: boolean;
    error: string | null;
  }>({
    groups: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await fetch("/api/groups");

        if (!res.ok) throw new Error("Failed to fetch groups");

        const data: GroupType[] = await res.json();

        setState({ groups: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          groups: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchGroups();
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
      <Button
        component="a"
        href="/groups/add"
        variant="contained"
        startIcon={<GroupAddIcon />}
        sx={{ mb: 3 }}
      >
        Add Group
      </Button>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Groups
      </Typography>
      <GroupsTable groups={state.groups} />
    </main>
  );
}
