import { S3Event, S3Handler } from "aws-lambda";
// import S3 from "aws-sdk/clients/s3";
import AWS from "aws-sdk";
import csv from "csv-parser";
import logger from "./utils/logger";

export const importFileParser: S3Handler = async (event: S3Event) => {
  logger.info(event, "importFileParser");

  const REGION = "eu-west-1";
  const BUCKET = "maksumov-bucket-for-images";

  try {
    const s3 = new AWS.S3({ region: REGION });
    event.Records.forEach((record) => {
      const keyUploaded = record.s3.object.key;
      const keyParsed = keyUploaded.replace("uploaded", "parsed");
      console.log("keyUploaded", keyUploaded);
      console.log("keyParsed", keyParsed);

      const s3Stream = s3
        .getObject({
          Bucket: BUCKET,
          Key: keyUploaded,
        })
        .createReadStream();

      s3Stream
        .pipe(csv())
        .on("error", (error) => console.error("error", error))
        .on("data", (data) => console.log("Parsed CSV data", data))

        .on("end", async () => {
          console.log(`Copy from ${BUCKET}/${keyUploaded}`);

          await s3
            .copyObject({
              Bucket: BUCKET,
              CopySource: BUCKET + "/" + keyUploaded,
              Key: keyParsed,
            })
            .promise();

          console.log(`Copied into ${BUCKET}/${keyParsed}`);

          await s3
            .deleteObject({
              Bucket: BUCKET,
              Key: keyUploaded,
            })
            .promise();

          console.log(`Deleted from ${BUCKET}/${keyUploaded}`);
        });
    });
  } catch (error) {
    console.error("error", error);
  }

  // return new Promise((resolve) => {
  //   resolve();
  // });
};
