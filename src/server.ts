import { scopePerRequest } from 'awilix-express';
import container from './container';
import express from 'express';
import routes from './routes';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(scopePerRequest(container));
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
