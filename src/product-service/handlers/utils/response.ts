import { APIGatewayProxyResult } from "aws-lambda";

export default (statusCode: number, body: string): APIGatewayProxyResult => ({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  statusCode,
  body,
});
