import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { default as productList } from "./products.json";

export const getProductById: APIGatewayProxyHandler = async (event) => {
  console.log(
    `getProductById started with event: ${JSON.stringify(event, null, 2)}`
  );

  // hardcoded id
  const id = "531233";
  const product = productList.filter((p) => p.id === id);

  return {
    statusCode: 200,
    body: JSON.stringify(product[0], null, 2),
  };
};
