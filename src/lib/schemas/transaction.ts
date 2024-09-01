import { z } from "zod";

export const transactionSchema = z.object({
  date: z.string({
    required_error: "Transaction date is required",
    invalid_type_error: "Transaction date must be a date string",
  }),
  type: z.enum(["DONATION", "EXPENSE"], {
    required_error: "Transaction type is required",
    invalid_type_error:
      "Transaction must either be typed as either a donation or an expense",
  }),
  amount: z.string({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a numeric string",
  }),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .nullable(),
  contactId: z
    .string({
      invalid_type_error: "Contact ID must be a string",
    })
    .nullable(),
});
