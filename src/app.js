import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json } from 'express';
import { apiRoutes } from './api/v1/routes/routes.js';

import { errorMiddleware } from './api/v1/middlewares/errorMiddleware.js';
import { loggerMiddlewares } from './api/v1/middlewares/loggerMiddleware.js';

import helmet from 'helmet';

const app = express();

app.use(helmet());
//app.use(cors(corsOptions));
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5175',
      'https://jsd9-pickled-cat-frontend.vercel.app',
    ], // your frontend domain
    credentials: true, // ✅ allow cookies to be sent
  }),
);
app.use(cookieParser());

app.use(json());
app.use(loggerMiddlewares);

app.use('/', apiRoutes);

app.use(errorMiddleware);

export { app };
