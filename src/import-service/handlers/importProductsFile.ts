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
