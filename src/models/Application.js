const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Applicant name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    resume_link: {
      type: String,
      required: [true, 'Resume link is required'],
      trim: true,
      match: [
        /^https?:\/\/.+/,
        'Resume link must be a valid URL starting with http:// or https://',
      ],
    },
    cover_note: {
      type: String,
      trim: true,
      maxlength: [2000, 'Cover note cannot exceed 2000 characters'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('Application', applicationSchema);
