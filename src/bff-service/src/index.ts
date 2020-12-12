/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

dotenv.config();

/**
 * App Variables
 */

const PORT: number = parseInt((process.env.PORT as string) || "3000", 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());

/**
 * Server Activation
 */

app.use("/", (req, res) =>
  res.json({
    message: "Hello!",
  })
);

const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

/**
 * Webpack HMR Activation
 */
