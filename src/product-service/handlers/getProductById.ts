import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import logger from "./utils/logger";
import { pgQuery } from "./utils/pg-client";
import response from "./utils/response";

export const getProductById: APIGatewayProxyHandler = async (event) => {
  logger.info(event, "getProductById");

  try {
    const { id } = event.pathParameters;
    const isUuid = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;

    // test if id is valid UUID
    if (id && isUuid.test(id)) {
      const product = await pgQuery({
        name: "get product & stocks by product id",
        text: `SELECT products.*, stocks.count
    FROM store.products products, store.stocks stocks
    WHERE stocks.product_id = products.id and products.id=$1`,
        values: [id],
      });

      if (product.length === 0) {
        return response(
          404,
          JSON.stringify({ error: "Product not Found" }, null, 2)
        );
      } else {
        return response(200, JSON.stringify(product[0], null, 2));
      }
    } else {
      return response(400, JSON.stringify({ error: "Bad request" }, null, 2));
    }
  } catch (err) {
    logger.error(err, "Error catching product by id");
    return response(
      500,
      JSON.stringify({ error: "Internal Server Error" }, null, 2)
    );
  }
};
