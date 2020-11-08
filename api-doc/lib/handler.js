import awsServerlessExpress from "aws-serverless-express";
import "source-map-support/register";
import app from "./handlers/app";
const server = awsServerlessExpress.createServer(app);
export const apidoc = async (event, _context) => awsServerlessExpress.proxy(server, event, _context);
//# sourceMappingURL=handler.js.map