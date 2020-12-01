import { S3Event, S3Handler } from "aws-lambda";
import AWS, { SQS } from "aws-sdk";
import csv from "csv-parser";
import logger from "./utils/logger";

export const importFileParser: S3Handler = async (event: S3Event) => {
  logger.info(event, "importFileParser");
  console.log("process.env.SQS_URL", process.env.SQS_URL);

  const REGION = "eu-west-1";
  const BUCKET = "maksumov-bucket-for-images";

  const records: Promise<unknown>[] = [];

  try {
    const s3 = new AWS.S3({ region: REGION });

    event.Records.forEach((record) => {
      const keyUploaded = record.s3.object.key;
      const keyParsed = keyUploaded.replace("uploaded", "parsed");
      console.log("keyUploaded", keyUploaded);
      console.log("keyParsed", keyParsed);

      records.push(
        new Promise((resolve, reject) => {
          const s3Stream = s3
            .getObject({
              Bucket: BUCKET,
              Key: keyUploaded,
            })
            .createReadStream();

          s3Stream
            .pipe(csv())
            .on("error", (error) => {
              console.error("error", error);
              reject(error);
            })
            .on("data", async (data) => {
              console.log("Parsed CSV data", data);

              const sqs: SQS = new AWS.SQS();

              sqs.sendMessage(
                {
                  MessageBody: JSON.stringify(data),
                  QueueUrl: process.env.SQS_URL,
                },
                (err, result) => {
                  if (err) {
                    console.log("Error while send Message to SQS Queue", err);
                    reject(err);
                  }
                  console.log("Result of send data to SQS Queue", result);
                  resolve(result);
                }
              );
            })

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
              resolve();
            });
        })
      );
    });
    await Promise.all(records);
    return;
  } catch (error) {
    console.error("error", error);
  }

  // return new Promise((resolve) => {
  //   resolve();
  // });
};
