const express = require('express');
const router = express.Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
} = require('../controllers/jobController');
const { validateJob } = require('../validators');
const { handleValidation } = require('../middleware/errorHandler');

// GET /api/jobs – List all jobs (supports ?search=, ?category=, ?location= query params)
router.get('/', getAllJobs);

// GET /api/jobs/:id – Get single job details
router.get('/:id', getJobById);

// POST /api/jobs – Create a job (Admin)
router.post('/', validateJob, handleValidation, createJob);

// DELETE /api/jobs/:id – Delete a job (Admin)
router.delete('/:id', deleteJob);

module.exports = router;
