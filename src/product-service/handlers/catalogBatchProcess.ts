import { SQSEvent, SQSHandler } from "aws-lambda";
import logger from "./utils/logger";

export const catalogBatchProcess = (event: SQSEvent): SQSHandler => {
  logger.info(event, "catalogBatchProcessing");
  return;
};
