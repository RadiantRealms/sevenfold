import { z } from "zod";

export const householdSchema = z.object({
  name: z.string({
    required_error: "Household name is required",
    invalid_type_error: "Household name must be a string",
  }),
  primaryContactId: z.string({
    required_error: "Primary contact is required",
    invalid_type_error: "Primary contact ID must be a string",
  }),
});
