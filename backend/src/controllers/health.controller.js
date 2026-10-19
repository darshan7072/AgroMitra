export const getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'AgroMitra API is running smoothly',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    service: 'agromitra-backend'
  });
};
