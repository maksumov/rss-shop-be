import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { default as productList } from "./products.json";

export const getProductById: APIGatewayProxyHandler = async (event) => {
  console.log(
    `getProductById started with event: ${JSON.stringify(event, null, 2)}`
  );

  const { id } = event.pathParameters;
  const product = productList.filter((p) => p.id === id)[0] || {};

  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    statusCode: 200,
    body: JSON.stringify(product, null, 2),
  };
};
