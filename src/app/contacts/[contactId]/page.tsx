import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import prisma from "../../../lib/prisma";
import DeleteContactButton from "@/components/delete-contact-button";

interface IParams {
  contactId: string;
}

async function getContactDetails(id: IParams["contactId"]) {
  const contact = await prisma.contact.findUnique({
    where: {
      id,
    },
  });
  return contact;
}

export default async function ContactDetails({ params }: { params: IParams }) {
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
      <Typography variant="h4">
        {contact.firstName +
          " " +
          (contact?.middleName || "") +
          " " +
          contact.lastName}
      </Typography>
      <DeleteContactButton contactId={contactId} />
    </main>
  );
}
