import { Client } from "pg";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const invoke = async (event) => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const ddlResult = await client.query();
  } catch (error) {
    console.error("Error during database request executing: ", error);
  } finally {
    // In case if error is occured, connection won't close automatically
    client.end(); // manual closing of connection
  }
};

export { invoke };
