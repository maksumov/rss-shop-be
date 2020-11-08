const app = require("express")();
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
// require("express-async-errors");

// Loggers
const { log, httpAccessLogger } = require("./common/logger");

app.use(express.json());
app.use(require("cors")());

// Mount Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "../doc/api.yaml"));
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
