"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteGroupButton({ groupId }: { groupId: string }) {
  const router = useRouter();
  const deleteGroup = async (id: string) => {
    try {
      await fetch(`/api/groups/${id}`, {
        method: "DELETE",
      });
      router.push("/groups");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={() => deleteGroup(groupId)}
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      sx={{ my: 3 }}
    >
      Delete Group
    </Button>
  );
}
