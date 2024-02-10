"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteContactButton({
  contactId,
}: {
  contactId: string;
}) {
  const router = useRouter();
  const deleteContact = async (id: string) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });
      router.push("/contacts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={() => deleteContact(contactId)}
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      sx={{ my: 3 }}
    >
      Delete Contact
    </Button>
  );
}
