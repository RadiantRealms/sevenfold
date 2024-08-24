"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupMembersTable from "@/components/groups/group-members-table";
import ContactDetails from "@/components/contacts/contact-details";
import CircularProgress from "@mui/material/CircularProgress";
import { GroupType } from "@/app/types";

interface IParams {
  groupId: string;
}

export default function GroupDetailsPage({ params }: { params: IParams }) {
  const [group, setGroup] = useState<GroupType | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroup() {
      try {
        const res = await fetch(`/api/groups/${params.groupId}`);

        if (!res.ok) throw new Error("Failed to fetch");

        const data: GroupType = await res.json();

        setGroup(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchGroup();
  }, [params.groupId]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
      {group ? (
        <>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            {group.name}
          </Typography>
          <GroupMembersTable group={group} />
          {/* <DeleteGroupButton groupId={params.groupId} /> */}
        </>
      ) : (
        <Typography variant="h6">Group not found</Typography>
      )}
    </main>
  );
}
