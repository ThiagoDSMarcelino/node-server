import 'dotenv/config';

import { scopePerRequest } from 'awilix-express';
import cors from 'cors';
import express from 'express';

import container from './container';
import routes from './routes';

const app = express();

app.use(cors());
app.use(scopePerRequest(container));
app.use('/api', routes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
