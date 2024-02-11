import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditContactForm from "@/components/edit-contact-form";
import prisma from "../../../../lib/prisma";

interface IParams {
  contactId: string;
}

async function getContactDetails(id: string) {
  const contact = await prisma.contact.findUnique({
    where: {
      id,
    },
  });
  return contact;
}

export default async function EditContactPage({ params }: { params: IParams }) {
  const { contactId } = params;
  const contact = await getContactDetails(contactId);
  if (!contact) {
    return false;
  }

  return (
    <main>
      <Button
        component="a"
        href={`/contacts/${contactId}`}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Return to contact profile
      </Button>
      <EditContactForm contact={contact} />
    </main>
  );
}
