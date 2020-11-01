import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";
import { default as productList } from "./products.json";

export const getProductById: APIGatewayProxyHandler = async (event) => {
  console.log(
    `getProductById started with event: ${JSON.stringify(event, null, 2)}`
  );

  const { byid } = event.pathParameters;
  const product = productList.filter((p) => p.id === byid);

  return {
    statusCode: 200,
    body: JSON.stringify(product[0], null, 2),
  };
};
