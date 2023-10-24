import routes from './routes';
import container from './container';
import 'dotenv/config';
import cors from 'cors';

const app = container.resolve('app');

app.use(cors());
app.use(routes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
