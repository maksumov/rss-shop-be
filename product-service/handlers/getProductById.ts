import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import getProducts from "./utils/asyncRequest";
import logger from "./utils/logger";
import response from "./utils/response";

export const getProductById: APIGatewayProxyHandler = async (event) => {
  logger.info(event, "getAllProducts");

  try {
    const { id } = event.pathParameters;
    const productList = await getProducts();

    const product = productList.filter((p) => p.id === id)[0];

    if (!product) {
      return response(404, "Product not Found");
    } else {
      return response(200, JSON.stringify(product, null, 2));
    }
  } catch (err) {
    logger.error(err, "Error catching products list");
    return response(500, "Internal Server Error");
  }
};
