import { verifyToken } from '../services/auth.service.js';
import User from '../models/user.model.js';
import { isDatabaseConnected } from '../config/db.js';

export const authenticate = async (req, res, next) => {
  try {
    let token = null;

    // Check HttpOnly cookie first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required. Please log in to access this resource.'
      });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired session. Please log in again.'
      });
    }

    if (!isDatabaseConnected()) {
      return res.status(503).json({
        status: 'error',
        code: 'DB_UNAVAILABLE',
        message: 'Database service is currently unavailable. Please verify MongoDB is running or configure MONGODB_URI in backend/.env.'
      });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User account not found or has been removed.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
