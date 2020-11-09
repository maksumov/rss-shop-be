import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import logger from "./utils/logger";
import { pgQuery } from "./utils/pg-client";
import response from "./utils/response";

export const createProduct: APIGatewayProxyHandler = async (event) => {
  logger.info(event, "createProduct");

  const { title, description, price, count } = JSON.parse(event.body);
  logger.info({ title, description, price, count }, "createProduct");

  try {
    await pgQuery({ text: "BEGIN" });

    const res = await pgQuery({
      name: "add product to products list and get its id",
      text: `INSERT INTO store.products (title,description,price) VALUES ($1, $2, $3) RETURNING id`,
      values: [title, description, parseInt(price, 10)],
    });
    const { id } = res[0];

    await pgQuery({
      name: "add stocks for new product",
      text: `INSERT INTO store.stocks (product_id,count) VALUES ($1, $2)`,
      values: [id, parseInt(count, 10)],
    });
    await pgQuery({ text: "COMMIT" });

    return response(200, JSON.stringify({ id }, null, 2));
  } catch (err) {
    await pgQuery({ text: "ROLLBACK" });
    logger.error(err, "Error creating product");
    return response(
      500,
      JSON.stringify({ error: "Internal Server Error" }, null, 2)
    );
  }
};
