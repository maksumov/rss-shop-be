import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import productList from "./products.json";

export const getAllProducts: APIGatewayProxyHandler = async (event) => {
  console.log(
    `getAllProducts started with event: ${JSON.stringify(event, null, 2)}`
  );

  return {
    statusCode: 200,
    body: JSON.stringify(productList, null, 2),
  };
};
