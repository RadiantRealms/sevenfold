import { z } from "zod";

export const personSchema = z.object({
  fullName: z.string({
    required_error: "Full name is required",
    invalid_type_error: "Full name must be a string",
  }),
  email: z
    .string({ invalid_type_error: "Email address must be a string" })
    .nullable(),
  phone: z
    .string({ invalid_type_error: "Phone number must be a string" })
    .nullable(),
  streetAddress: z
    .string({ invalid_type_error: "Street address must be a string" })
    .nullable(),
  city: z.string({ invalid_type_error: "City must be a string" }).nullable(),
  state: z.string({ invalid_type_error: "State must be a string" }).nullable(),
  postalCode: z
    .string({ invalid_type_error: "Postal code must be a string" })
    .nullable(),
  gender: z.string({
    required_error: "Gender is required",
    invalid_type_error: "Gender must be a string",
  }),
  ageRange: z.enum(["ADULT", "CHILD"], {
    required_error: "Age range is required",
    invalid_type_error: "Age range must be a string",
  }),
  birthdate: z
    .string({ invalid_type_error: "Birthdate must be a string" })
    .nullish(),
  maritalStatus: z
    .string({ invalid_type_error: "Marital status must be a string" })
    .nullable(),
  anniversary: z
    .string({ invalid_type_error: "Anniversary must be a string" })
    .nullish(),
  joinDate: z
    .string({ invalid_type_error: "Join date must be a string" })
    .nullish(),
  addToHousehold: z.boolean().optional(),
  removeFromHousehold: z.boolean().optional(),
});
