"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteContactButton from "@/components/delete-contact-button";
import ContactDetails from "@/components/contact-details";
import CircularProgress from "@mui/material/CircularProgress";
import { ContactType } from "@/app/types";

interface IParams {
  contactId: string;
}

export default function ContactDetailsPage({ params }: { params: IParams }) {
  const [contact, setContact] = useState<ContactType | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch(`/api/contacts/${params.contactId}`);

        if (!res.ok) throw new Error("Failed to fetch");

        const data: ContactType = await res.json();

        setContact(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchContact();
  }, [params.contactId]);

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
        href="/contacts"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        View All Contacts
      </Button>
      {contact ? (
        <>
          <ContactDetails contact={contact} />
          <DeleteContactButton contactId={params.contactId} />
        </>
      ) : (
        <Typography variant="h6">Contact not found</Typography>
      )}
    </main>
  );
}
