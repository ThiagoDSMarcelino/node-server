import 'dotenv/config';

import { scopePerRequest } from 'awilix-express';
import cors from 'cors';
import express from 'express';

import errorHandler from './api/middleware/errorHandler';
import routes from './api/routes';
import container from './config/container';

const app = express();

app.use(cors());
app.use(scopePerRequest(container));
app.use('/api', routes);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
