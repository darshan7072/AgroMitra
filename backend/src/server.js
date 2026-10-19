import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`[AgroMitra Server] Running in ${config.nodeEnv} mode on port ${PORT}`);
  console.log(`[AgroMitra Server] Health check available at: http://localhost:${PORT}/api/health`);
});

// Handle graceful shutdown
const shutdown = () => {
  console.log('[AgroMitra Server] Shutting down gracefully...');
  server.close(() => {
    console.log('[AgroMitra Server] Process terminated.');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
