const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('[db] MONGO_URI is not set. Please configure your .env file.');
    process.exit(1);
  }

  mongoose.set('strictQuery', true);
  // Without this, queries issued while disconnected buffer indefinitely,
  // making requests hang forever instead of failing with a clear error.
  mongoose.set('bufferTimeoutMS', 8000);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`[db] MongoDB connected -> ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.error('[db] MongoDB connection error:', err.message);
    console.error('[db] Retrying in 5s... (is MongoDB running and is MONGO_URI correct?)');
    // Retry after a delay instead of crashing the whole process immediately.
    setTimeout(connectDB, 5000);
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('[db] MongoDB disconnected. Attempting to reconnect...');
  });

  mongoose.connection.on('error', (err) => {
    console.error('[db] MongoDB runtime error:', err.message);
  });
}

module.exports = connectDB;
