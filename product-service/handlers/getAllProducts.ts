import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import getProducts from "./utils/asyncRequest";
import logger from "./utils/logger";
import response from "./utils/response";

export const getAllProducts: APIGatewayProxyHandler = async (event, context) => {
  logger.info({event, context}, "getAllProducts");

  try {
    return response(200, JSON.stringify(await getProducts(), null, 2));
  } catch (err) {
    logger.error(err, "Error catching products list");
    return response(500, "Internal Server Error");
  }
};
