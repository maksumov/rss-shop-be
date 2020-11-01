import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";

export const products: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        productName: "Book",
        price: 800,
      },
      null,
      2
    ),
  };
};
