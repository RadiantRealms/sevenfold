"use client";

import { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import dayjs from "dayjs";
import { ContactType, TransactionType } from "@/lib/types";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale={true}
        valueIsNumericString
        prefix="$"
      />
    );
  }
);

export default function EditTransactionForm({
  transaction,
  contacts,
}: {
  transaction: TransactionType;
  contacts: ContactType[];
}) {
  const router = useRouter();
  const [state, setState] = useState<{
    amount: string;
    type: "DONATION" | "EXPENSE";
    date: string;
    description: string | null;
    associatedContactId: string | null;
    error: string | null;
  }>({
    amount: `${
      transaction.type == "DONATION" ? transaction.amount : -transaction.amount
    }`,
    type: transaction.type,
    date: `${transaction.date}`,
    description: transaction.description,
    associatedContactId: transaction.contactId,
    error: null,
  });

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);

      if (!data.get("date")) throw new Error("Date is required");

      const body = {
        date: dayjs(data.get("date")?.toString(), "MM/DD/YYYY").toISOString(),
        type: state.type,
        amount: state.amount,
        description: state.description,
        contactId: state.associatedContactId,
      };

      const res = await fetch(`/api/transactions/${transaction.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to update transaction");

      const updatedTransaction: TransactionType = await res.json();

      router.push(`/transactions/${updatedTransaction.id}`);
    } catch (error) {
      setState({
        ...state,
        error: (error as Error).message,
      });
    }
  };

  return (
    <main>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Transaction
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <DatePicker
                defaultValue={dayjs(transaction.date)}
                label="Date"
                name="date"
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid xs={12}>
              <FormControl required fullWidth>
                <InputLabel id="transaction-type-select-label">
                  Transaction Type
                </InputLabel>
                <Select
                  labelId="transaction-type-select-label"
                  id="transaction-type-select"
                  name="type"
                  defaultValue={state.type}
                  value={state.type}
                  label="Transaction Type *"
                  onChange={handleSelectChange}
                >
                  <MenuItem value={"DONATION"}>Donation</MenuItem>
                  <MenuItem value={"EXPENSE"}>Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                required
                label="Amount"
                defaultValue={state.amount}
                value={state.amount}
                onChange={handleAmountChange}
                name="amount"
                id="amount"
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                defaultValue={transaction.description}
                id="description"
                label="Description"
                name="description"
              />
            </Grid>
            <Grid xs={12}>
              <FormControl fullWidth>
                <InputLabel id="associated-contact-select-label">
                  Associated Contact
                </InputLabel>
                <Select
                  labelId="associated-contact-select-label"
                  id="associated-contact-select"
                  name="associatedContactId"
                  value={state.associatedContactId ?? ""}
                  label="Associated Contact"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">None</MenuItem>
                  {contacts.map((contact: ContactType) => (
                    <MenuItem key={contact.id} value={contact.id}>
                      {contact.firstName} {contact.middleName}{" "}
                      {contact.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Button
            component="a"
            href="/transactions"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </main>
  );
}
