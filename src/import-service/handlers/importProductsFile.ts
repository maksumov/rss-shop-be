import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";
import logger from "./utils/logger";
import { response } from "./utils/response";

const importProductsFile: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  logger.info(event, "importProductsFile");

  const REGION = "eu-west-1";
  const filename = event.queryStringParameters.name;

  // No filename or bad filename
  if (!filename || !/^[\w,\s-]+\.[A-Za-z]{3}$/.test(filename)) {
    return response(400, JSON.stringify({ error: "Bad request" }, null, 2));
  }

  const bucketParams = {
    Bucket: "maksumov-bucket-for-images",
    Key: filename,
    Expires: 60,
    ContentType: "text/csv",
  };

  const s3 = new S3({ region: REGION });
  return new Promise((resolve, reject) => {
    s3.getSignedUrl("putObject", bucketParams, (err, preSignedUrl) => {
      if (err) {
        reject(err);
      }

      resolve(response(200, preSignedUrl));
    });
  });
};

export { importProductsFile };
