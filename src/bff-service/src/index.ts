/**
 * Required External Modules
 */

import express from 'express';
import helmet from 'helmet';
import { cors } from './middlewares/cors';
import { interceptor } from './middlewares/interceptor';
import { mainpage } from './middlewares/mainpage';

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

app.use(mainpage);
app.use(interceptor);

const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
