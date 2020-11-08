import express from "express";
import swaggerUi from "swagger-ui-express";
import openapi from "./openapi";
const app = express();
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(openapi));
export default app;
//# sourceMappingURL=app.js.map