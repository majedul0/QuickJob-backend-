const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { signup, login, getMe } = require('../controllers/authController');
const { handleValidation } = require('../middleware/errorHandler');
const { protect } = require('../middleware/auth');

// Validation rules for signup
const validateSignup = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  body('role')
    .optional()
    .isIn(['jobseeker', 'employer'])
    .withMessage('Role must be jobseeker or employer'),
];

// Validation rules for login
const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// POST /api/auth/signup – Register
router.post('/signup', validateSignup, handleValidation, signup);

// POST /api/auth/login – Login
router.post('/login', validateLogin, handleValidation, login);

// GET /api/auth/me – Get current user (protected)
router.get('/me', protect, getMe);

module.exports = router;
