import { z } from "zod";
import { emailSchema } from "@midso/common";

export const recoverySellerSchema = z.object({
  email: emailSchema
});