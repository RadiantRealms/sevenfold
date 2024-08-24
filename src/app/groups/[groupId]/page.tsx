"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import GroupMembersTable from "@/components/groups/group-members-table";
import LoadingComponent from "@/components/common/loading-component";
import ErrorMessage from "@/components/common/error-message";
import { GroupType } from "@/app/types";
import DeleteGroupButton from "@/components/groups/delete-group-button";

interface IParams {
  groupId: string;
}

export default function GroupDetailsPage({ params }: { params: IParams }) {
  const [state, setState] = useState<{
    group: GroupType | null;
    isLoading: boolean;
    error: string | null;
  }>({
    group: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchGroup() {
      try {
        const res = await fetch(`/api/groups/${params.groupId}`);

        if (!res.ok) throw new Error("Failed to fetch group with that ID");

        const data: GroupType = await res.json();

        setState({ group: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          group: null,
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchGroup();
  }, [params.groupId]);

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
        href="/groups"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        View All Groups
      </Button>
      {state.group && (
        <>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            {state.group.name}
          </Typography>
          <Button
            component="a"
            href={`/groups/${state.group.id}/edit`}
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ mt: 1, mb: 3 }}
          >
            Edit Group
          </Button>
          <GroupMembersTable group={state.group} />
          <DeleteGroupButton groupId={state.group.id} />
        </>
      )}
    </main>
  );
}
