"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
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
import { TransactionType } from "@/app/types";

export default function RecordTransaction({
  transaction,
}: {
  transaction: TransactionType;
}) {
  const router = useRouter();

  const [transactionType, setTransactionType] = useState(
    transaction.type as string
  );

  const handleTransactionTypeChange = (event: SelectChangeEvent) => {
    setTransactionType(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const body = {
        date: dayjs(data.get("date")?.toString(), "MM/DD/YYYY").toISOString(),
        type: transactionType,
        amount: data.get("amount"),
        description: data.get("description"),
      };

      await fetch(`/api/transactions/${transaction.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      router.push(`/transactions/${transaction.id}`);
    } catch (error) {
      console.error(error);
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
                  defaultValue={transaction.type}
                  value={transactionType}
                  label="Transaction Type *"
                  onChange={handleTransactionTypeChange}
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
                defaultValue={transaction.amount}
                id="amount"
                label="Amount"
                name="amount"
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
