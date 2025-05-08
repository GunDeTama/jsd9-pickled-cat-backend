import { app } from './app.js';
import { config } from './configs/env.js';
import * as mongoDb from './configs/mongo.js';

await mongoDb.initializeDb();

const { HOSTNAME, PORT } = config;
app.listen(PORT, (err) => {
  if (err) {
    console.error(`[Server]: ${err.message}`);
    process.exit(1);
  }

  console.log(`[Server]: running at ${HOSTNAME}:${PORT}`);
});
