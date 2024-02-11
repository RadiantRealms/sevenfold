import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteContactButton from "@/components/delete-contact-button";
import ContactDetails from "@/components/contact-details";
import prisma from "../../../lib/prisma";

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

export default async function ContactPage({ params }: { params: IParams }) {
  const { contactId } = params;
  const contact = await getContactDetails(contactId);

  if (!contact) {
    return false;
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
      <ContactDetails contact={contact} />
      <DeleteContactButton contactId={contactId} />
    </main>
  );
}
