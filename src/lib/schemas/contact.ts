import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string({
    required_error: "First name is required",
    invalid_type_error: "First name must be a string",
  }),
  middleName: z
    .string({
      invalid_type_error: "Middle name must be a string",
    })
    .nullable(),
  lastName: z.string({
    required_error: "Last name is required",
    invalid_type_error: "Last name must be a string",
  }),
  address1: z
    .string({
      invalid_type_error: "Address line 1 must be a string",
    })
    .nullable(),
  address2: z
    .string({
      invalid_type_error: "Address line 2 must be a string",
    })
    .nullable(),
  city: z
    .string({
      invalid_type_error: "City must be a string",
    })
    .nullable(),
  state: z
    .string({
      invalid_type_error: "State must be a string",
    })
    .nullable(),
  zip: z
    .string({
      invalid_type_error: "Zip code must be a string",
    })
    .nullable(),
  phone: z
    .string({
      invalid_type_error: "Phone number must be a string",
    })
    .nullable(),
  email: z
    .string({
      required_error: "Email address is required",
      invalid_type_error: "Email address must be a string",
    })
    .email({ message: "Invalid email address" }),
  groupId: z
    .string({ invalid_type_error: "Group ID must be a string" })
    .nullable(),
});
