import { rateLimit } from 'express-rate-limit';

export const rateLimitter = rateLimit({
  legacyHeaders: false,
  limit: 200,
  standardHeaders: true,
  windowMs: 60 * 60 * 1000,
});
