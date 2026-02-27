const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getAllApplications,
} = require('../controllers/applicationController');
const { validateApplication } = require('../validators');
const { handleValidation } = require('../middleware/errorHandler');

// POST /api/applications – Submit a job application
router.post('/', validateApplication, handleValidation, submitApplication);

// GET /api/applications – List all applications (Admin, supports ?job_id= filter)
router.get('/', getAllApplications);

module.exports = router;
