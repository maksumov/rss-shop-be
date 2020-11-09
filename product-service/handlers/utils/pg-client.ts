import { Client, ClientConfig, QueryConfig } from "pg";
import logger from "./logger";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions: ClientConfig = {
  host: PG_HOST,
  port: parseInt(PG_PORT, 10),
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const pgQuery = async (query: QueryConfig) => {
  logger.info(query, "pgQuery");

  const client = new Client(dbOptions);
  await client.connect();

  let result;

  try {
    result = await client.query(query);
  } catch (error) {
    console.error("Error during database request executing: ", error);
  } finally {
    // In case if error is occured, connection won't close automatically
    client.end(); // manual closing of connection
  }

  logger.info(result, "pgQuery");
  return result.rows;
};

export { pgQuery };
