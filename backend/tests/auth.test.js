import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken, getCookieOptions } from '../src/services/auth.service.js';
import User from '../src/models/user.model.js';
import { authenticate } from '../src/middleware/auth.middleware.js';

describe('AgroMitra Authentication & Security Suite', () => {

  describe('JWT Token & Cookie Configuration', () => {
    test('generateToken should produce a valid signed JWT containing user ID', () => {
      const mockUserId = '662058479320857392817492';
      const token = generateToken(mockUserId);
      assert.ok(typeof token === 'string' && token.length > 20, 'Token must be a valid non-empty string');

      const decoded = verifyToken(token);
      assert.equal(decoded.id, mockUserId, 'Decoded token ID must match the original user ID');
    });

    test('verifyToken should throw error for invalid or tampered token', () => {
      assert.throws(() => {
        verifyToken('invalid.tampered.token');
      }, /jwt malformed|invalid token/);
    });

    test('getCookieOptions should return secure HttpOnly cookie settings', () => {
      const options = getCookieOptions();
      assert.equal(options.httpOnly, true, 'Cookie must be HttpOnly to prevent XSS theft');
      assert.equal(options.path, '/', 'Cookie path must be root');
      assert.ok(options.maxAge > 0, 'Cookie must have positive expiration time');
      assert.ok(['lax', 'none'].includes(options.sameSite), 'SameSite must be properly configured');
    });
  });

  describe('Password Hashing & User Model Schema Rules', () => {
    test('User schema requires valid email and 10-digit Indian mobile number', async () => {
      const invalidUser = new User({
        name: 'A', // Too short
        email: 'invalid-email',
        mobile: '12345', // Invalid Indian mobile
        password: '123' // Too short
      });

      let validationError = null;
      try {
        await invalidUser.validate();
      } catch (err) {
        validationError = err;
      }

      assert.ok(validationError, 'Validation error must be triggered for invalid inputs');
      assert.ok(validationError.errors.name, 'Name minlength validation failed');
      assert.ok(validationError.errors.email, 'Email regex validation failed');
      assert.ok(validationError.errors.mobile, 'Mobile regex validation failed');
      assert.ok(validationError.errors.password, 'Password minlength validation failed');
    });

    test('Valid Indian mobile numbers should pass validation', async () => {
      const validNumbers = ['9876543210', '8888888888', '7000000000', '6999999999'];
      for (const num of validNumbers) {
        const user = new User({
          name: 'Farmer Ramesh',
          email: 'ramesh@agromitra.in',
          mobile: num,
          password: 'securePassword123'
        });
        await user.validate();
      }
    });

    test('Password hashing pre-save hook and comparePassword method work accurately', async () => {
      const plainPassword = 'FarmerSecretKey#2026';
      const user = new User({
        name: 'Kisan Balwan',
        email: 'kisan.balwan@agromitra.in',
        mobile: '9123456780',
        password: plainPassword
      });

      // Emulate pre-save password hashing
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      // Verify plaintext password is never stored
      assert.notEqual(user.password, plainPassword, 'Stored password must not equal plaintext');
      assert.ok(user.password.startsWith('$2'), 'Hashed password must have bcrypt signature');

      // Verify comparePassword returns true for correct and false for wrong password
      const matchSuccess = await user.comparePassword(plainPassword);
      assert.equal(matchSuccess, true, 'comparePassword must return true for correct password');

      const matchFailure = await user.comparePassword('WrongPassword');
      assert.equal(matchFailure, false, 'comparePassword must return false for incorrect password');
    });

    test('toJSON serialization never exposes password or __v', () => {
      const user = new User({
        name: 'Suresh Patel',
        email: 'suresh@agromitra.in',
        mobile: '9876543211',
        password: '$2a$10$FakeHashedPasswordStringForSerializationTest'
      });

      const serialized = user.toJSON();
      assert.equal(serialized.password, undefined, 'Password must not be in serialized JSON output');
      assert.equal(serialized.__v, undefined, '__v must not be in serialized JSON output');
      assert.ok(serialized.id, 'Serialized object must have id attribute');
    });
  });

  describe('Authentication Middleware Protection', () => {
    test('authenticate should block request when no cookie or header token is present', async () => {
      const req = { cookies: {}, headers: {} };
      let statusCode = null;
      let jsonPayload = null;
      const res = {
        status(code) {
          statusCode = code;
          return this;
        },
        json(data) {
          jsonPayload = data;
          return this;
        }
      };
      let nextCalled = false;

      await authenticate(req, res, () => { nextCalled = true; });

      assert.equal(statusCode, 401, 'Should respond with 401 Unauthorized');
      assert.equal(jsonPayload.status, 'error');
      assert.equal(nextCalled, false, 'next() must NOT be called when unauthenticated');
    });

    test('authenticate should block request when token is invalid or expired', async () => {
      const req = { cookies: { token: 'invalid.jwt.token' }, headers: {} };
      let statusCode = null;
      let jsonPayload = null;
      const res = {
        status(code) {
          statusCode = code;
          return this;
        },
        json(data) {
          jsonPayload = data;
          return this;
        }
      };
      let nextCalled = false;

      await authenticate(req, res, () => { nextCalled = true; });

      assert.equal(statusCode, 401, 'Should respond with 401 for invalid token');
      assert.match(jsonPayload.message, /invalid or expired session/i);
      assert.equal(nextCalled, false, 'next() must NOT be called');
    });
  });

});
