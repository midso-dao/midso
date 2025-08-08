import { productIdSchema } from "@midso/common";
import { z } from "zod";

export const verifyParams = z.object({
  id: productIdSchema
});