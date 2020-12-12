/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { cors } from './middlewares/cors';

dotenv.config();

/**
 * App Variables
 */

const PORT: number = parseInt((process.env.PORT as string) || '3000', 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.use('/', (req, res) =>
  res.json({
    message: 'Hello!'
  })
);

const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
