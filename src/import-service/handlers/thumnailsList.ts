import { S3 } from "aws-sdk";
import logger from "./utils/logger";
import { response } from "./utils/response";

const thumbnailList = async () => {
  logger.info(null, "thumnailList invoked");
  const s3 = new S3({ region: "eu-west-1" });
  return response(200, "All ok");
};

export { thumbnailList };
