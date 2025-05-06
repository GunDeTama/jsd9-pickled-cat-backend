import { config } from '../config/env.js';
const { CORS_ALLOW_ORIGIN, CORS_CREDENTIALS } = config;

/** @type {import('cors').CorsOptions} */
export const corsOptions = {
  allowedHeaders: 'Content-Type,Authorization',
  credentials: CORS_CREDENTIALS,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin: CORS_ALLOW_ORIGIN,
};
