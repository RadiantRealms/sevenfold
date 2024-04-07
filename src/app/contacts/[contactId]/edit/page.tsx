"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditContactForm from "@/components/edit-contact-form";
import { ContactType } from "@/app/types";

interface IParams {
  contactId: string;
}

export default function EditContactPage({ params }: { params: IParams }) {
  const [contact, setContact] = useState<ContactType | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchContact() {
      try {
        const res = await fetch(`/api/contacts/${params.contactId}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data: ContactType = await res.json();

        if (!isMounted) {
          setContact(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchContact();

    return () => {
      isMounted = false;
    };
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
      {contact ? (
        <>
          <Button
            component="a"
            href={`/contacts/${params.contactId}`}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            Return to contact profile
          </Button>
          <EditContactForm contact={contact} />
        </>
      ) : (
        <>
          <Button
            component="a"
            href="/contacts"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            View All Contacts
          </Button>
          <Typography variant="h6">Contact not found</Typography>
        </>
      )}
    </main>
  );
}
