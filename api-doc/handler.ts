import { APIGatewayProxyHandler } from "aws-lambda";
import awsServerlessExpress from "aws-serverless-express";
import "source-map-support/register";
import app from "./handlers/app";

const server = awsServerlessExpress.createServer(app);
console.log("server", server);

export const apidoc: APIGatewayProxyHandler = async (event, _context) =>
  awsServerlessExpress.proxy(server, event, _context);
