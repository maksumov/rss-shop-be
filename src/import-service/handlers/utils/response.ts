import { APIGatewayProxyResult } from "aws-lambda";

const response = (statusCode: number, body: string): APIGatewayProxyResult => ({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  statusCode,
  body,
});

export { response };
