import { z } from "zod";

export const donationSchema = z.object({
  date: z.string({
    required_error: "Date is required",
    invalid_type_error: "Date must be a string",
  }),
  amount: z.string({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a string",
  }),
  fund: z.string({
    required_error: "Fund is required",
    invalid_type_error: "Fund name must be a string",
  }),
  personId: z.string({
    required_error: "Donor is required",
    invalid_type_error: "Donor name must be a string",
  }),
});
