const { body } = require('express-validator');

const validateJob = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Job title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),

  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ max: 100 })
    .withMessage('Company name cannot exceed 100 characters'),

  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 5000 })
    .withMessage('Description cannot exceed 5000 characters'),
];

const validateApplication = [
  body('job_id')
    .notEmpty()
    .withMessage('Job ID is required')
    .isMongoId()
    .withMessage('Invalid Job ID format'),

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Applicant name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('resume_link')
    .trim()
    .notEmpty()
    .withMessage('Resume link is required')
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Resume link must be a valid URL (http:// or https://)'),

  body('cover_note')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Cover note cannot exceed 2000 characters'),
];

module.exports = { validateJob, validateApplication };
