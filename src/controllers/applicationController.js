const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Submit a job application
// @route   POST /api/applications
const submitApplication = async (req, res, next) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    // Verify the job exists
    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found. Cannot apply to a non-existent job.',
      });
    }

    const application = await Application.create({
      job_id,
      name,
      email,
      resume_link,
      cover_note,
    });

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all applications (Admin - optional helper)
// @route   GET /api/applications
const getAllApplications = async (req, res, next) => {
  try {
    const { job_id } = req.query;
    const filter = {};

    if (job_id) {
      filter.job_id = job_id;
    }

    const applications = await Application.find(filter)
      .populate('job_id', 'title company')
      .sort({ created_at: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitApplication, getAllApplications };
