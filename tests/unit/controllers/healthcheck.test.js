import supertest from 'supertest';
import { it } from 'vitest';
import { app } from '../../setup.js';

it('GET /healthcheck success', () =>
  supertest(app)
    .get('/healthcheck')
    .query({ checkType: 'success' })
    .expect(200));

it('GET /healthcheck failed', () =>
  supertest(app)
    .get('/healthcheck')
    .expect('content-type', /json/)
    .expect(500));
