import app from './app.js';
import { config } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';

const PORT = config.port;

// Connect to MongoDB
connectDB();

const server = app.listen(PORT, () => {
  console.log(`[AgroMitra Server] Running in ${config.nodeEnv} mode on port ${PORT}`);
  console.log(`[AgroMitra Server] Health check available at: http://localhost:${PORT}/api/health`);
  console.log(`[AgroMitra Server] Auth endpoints available under: http://localhost:${PORT}/api/auth`);
});

// Handle graceful shutdown
const shutdown = async () => {
  console.log('[AgroMitra Server] Shutting down gracefully...');
  await disconnectDB();
  server.close(() => {
    console.log('[AgroMitra Server] Process terminated.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
