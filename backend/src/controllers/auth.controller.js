import User from '../models/user.model.js';
import { generateToken, getCookieOptions } from '../services/auth.service.js';

/**
 * Register a new farmer account
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    // Field presence checks
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields: name, email, mobile, and password.'
      });
    }

    // Name length check
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 60) {
      return res.status(400).json({
        status: 'error',
        message: 'Name must be between 2 and 60 characters.'
      });
    }

    // Email format validation & normalization
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = email.trim().toLowerCase();
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid email address.'
      });
    }

    // Indian mobile number validation (10 digits starting with 6-9)
    const trimmedMobile = mobile.trim();
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(trimmedMobile)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid 10-digit Indian mobile number.'
      });
    }

    // Password strength check
    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 6 characters long.'
      });
    }

    // Confirm password match check (if supplied)
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Passwords do not match.'
      });
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'An account with this email address already exists. Please log in.'
      });
    }

    // Create user (password is automatically hashed by Mongoose pre-save hook)
    const newUser = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      mobile: trimmedMobile,
      password
    });

    // Generate JWT and set HttpOnly cookie
    const token = generateToken(newUser._id);
    res.cookie('token', token, getCookieOptions());

    return res.status(201).json({
      status: 'success',
      message: 'Account created successfully. Welcome to AgroMitra!',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Farmer login
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide both email address and password.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Query user and explicitly select password field
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    // Generic error message to prevent user enumeration
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email address or password.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email address or password.'
      });
    }

    // Generate JWT and set HttpOnly cookie
    const token = generateToken(user._id);
    res.cookie('token', token, getCookieOptions());

    return res.status(200).json({
      status: 'success',
      message: 'Logged in successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Farmer logout
 * POST /api/auth/logout
 */
export const logout = (req, res) => {
  res.clearCookie('token', getCookieOptions());
  return res.status(200).json({
    status: 'success',
    message: 'Logged out successfully.'
  });
};

/**
 * Get current authenticated farmer profile
 * GET /api/auth/me
 */
export const getCurrentUser = (req, res) => {
  return res.status(200).json({
    status: 'success',
    user: req.user
  });
};
