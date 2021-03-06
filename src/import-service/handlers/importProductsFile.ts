import { APIGatewayProxyEvent } from "aws-lambda";
import S3 from "aws-sdk/clients/s3";
import logger from "./utils/logger";
import { response } from "./utils/response";

const isFilenameWithExtension = (name: string): boolean =>
  /^[\w,\s-]+\.[A-Za-z]{3}$/.test(name);

const importProductsFile = async (event: APIGatewayProxyEvent) => {
  logger.info(event, "importProductsFile");

  // No filename or bad filename
  const name = event.queryStringParameters?.name;
  if (!name || !isFilenameWithExtension(name)) {
    console.log("Bad name", name);
    return response(400, JSON.stringify({ error: "Bad request" }, null, 2));
  }

  const REGION = "eu-west-1";

  const bucketParams = {
    Bucket: "maksumov-bucket-for-images",
    Key: `uploaded/${name}`,
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
