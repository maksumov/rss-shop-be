import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import logger from "./utils/logger";
import { pgQuery } from "./utils/pg-client";
import response from "./utils/response";

export const getProductById: APIGatewayProxyHandler = async (event) => {
  logger.info(event, "getAllProducts");

  try {
    const { id } = event.pathParameters;
    const isUuid = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;

    // test if id is valid UUID
    if (id && isUuid.test(id)) {
      const product = await pgQuery(`SELECT products.*, stocks.count
    FROM store.products products, store.stocks stocks
    WHERE stocks.product_id = products.id and products.id='${id}'`);

      if (!product) {
        return response(404, "Product not Found");
      } else {
        return response(200, JSON.stringify(product, null, 2));
      }
    } else {
      return response(400, "Bad request");
    }
  } catch (err) {
    logger.error(err, "Error catching products list");
    return response(500, "Internal Server Error");
  }
};
