import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteContactButton from "@/components/delete-contact-button";
import ContactDetails from "@/components/contact-details";
import getContactById from "@/app/actions/getContactById";

interface IParams {
  contactId: string;
}

export default async function ContactPage({ params }: { params: IParams }) {
  const { contactId } = params;
  const contact = await getContactById(contactId);

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
