import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import logger from "./utils/logger";
import { pgQuery } from "./utils/pg-client";
import response from "./utils/response";

export const getAllProducts: APIGatewayProxyHandler = async (event) => {
  logger.info(event, "getAllProducts");

  try {
    return response(
      200,
      JSON.stringify(
        await pgQuery({
          name: "get all products and stocks",
          text: `SELECT products.*, stocks.count
    FROM store.products products, store.stocks stocks
    WHERE stocks.product_id = products.id`,
        }),
        null,
        2
      )
    );
  } catch (err) {
    logger.error(err, "Error catching products list");
    return response(500, "Internal Server Error");
  }
};
