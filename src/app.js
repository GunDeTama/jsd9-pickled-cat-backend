import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json } from 'express';
import { apiRoutes } from './api/v1/routes/routes.js';

import { errorMiddleware } from './api/v1/middlewares/errorMiddleware.js';
import { loggerMiddlewares } from './api/v1/middlewares/loggerMiddleware.js';

import helmet from 'helmet';

const app = express();

// Render specific
app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://jsd9-pickled-cat-frontend.vercel.app',
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(json());
app.use(loggerMiddlewares);

app.use('/', apiRoutes);

app.use(errorMiddleware);

export { app };
