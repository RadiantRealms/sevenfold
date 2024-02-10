import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContactsTable from "@/components/contacts-table";

export default async function Contacts() {
  return (
    <main>
      <Button
        component="a"
        href="/contacts/add"
        variant="contained"
        startIcon={<PersonAddIcon />}
        sx={{ mb: 3 }}
      >
        Add Contact
      </Button>
      <ContactsTable />
    </main>
  );
}
