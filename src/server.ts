import { scopePerRequest } from 'awilix-express';
import container from './container';
import routes from './routes';
import cors from 'cors';
import 'dotenv/config';

const app = container.resolve('app');

app.use(cors());
app.use(scopePerRequest(container));
app.use(routes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
