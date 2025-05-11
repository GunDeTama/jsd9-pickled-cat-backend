import cors from 'cors';
import express, { json } from 'express';
import apiRoutes from './api/v1/routes/routes.js';

import { errorMiddleware } from './api/v1/middlewares/errorMiddleware.js';
import { loggerMiddlewares } from './api/v1/middlewares/loggerMiddleware.js';

import helmet from 'helmet';
import { corsOptions } from './configs/cors.js';

const app = express();

app.use(helmet());
// app.use(cors(corsOptions));
app.use(
  cors({
    origin: "http://localhost:5173", // URL ของ Front-End ที่อนุญาตให้เข้าถึง
    credentials: true,               // อนุญาตส่ง cookies, headers
  })
);
app.use(json());
app.use(loggerMiddlewares);

// app.use('/healthcheck', healthcheckRoutes);
app.use('/', apiRoutes);

app.use(errorMiddleware);

export { app };
