import { logger } from "@midso/common";


export const catchError = async (error: any) => {
  logger.error(`[EXIT]=>:${error}`);

  return process.exit(1);
};


