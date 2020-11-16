import { S3Event, S3Handler } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";
import logger from "./utils/logger";

const importFileParser: S3Handler = async (event: S3Event) => {
  logger.info(event, "importFileParser");

  const REGION = "eu-west-1";
  // const BUCKET = "maksumov-bucket-for-images";

  // const bucketParams = {
  //   Bucket: "maksumov-bucket-for-images",
  //   Key: `uploaded/${name}`,
  //   Expires: 60,
  //   ContentType: "text/csv",
  // };

  const s3 = new S3({ region: REGION });

  for (const record of event.Records) {
    console.log("record logging >>", record);
  }
  return new Promise((resolve, reject) => {
    resolve();
  });
};

export { importFileParser };
