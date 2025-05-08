import mongoose from 'mongoose';
import { config } from './env.js';

/** @param {mongoose.Mongoose} mongoDb */
export const pingConnection = async (mongoDb) => {
  try {
    const result = await mongoDb.connection.db.admin().ping();
    console.log(`[Database]: Ping connection successfully: ${result.ok}`);
  } catch (error) {
    console.error(
      `[Database]: Unable to ping MongoDB
${error.name}: ${error.message}`,
    );
    process.exit(1);
  }
};

export const initializeDb = async () => {
  try {
    const mongoDb = await mongoose.connect(config.MONGO_URI, {
      autoCreate: false,
      bufferCommands: true,
      retryWrites: true,
      writeConcern: {
        w: 'majority',
      },
    });
    console.log(`[Database]: MongoDB connected: ${mongoDb.connection.name}`);
    await pingConnection(mongoDb);
  } catch (error) {
    console.error(
      `[Database]: Unable to connect MongoDb
${error.name}: ${error.message}`,
    );
    process.exit(1);
  }
};
