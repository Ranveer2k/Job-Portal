const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  salary: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'USD' },
    isPublic: { type: Boolean, default: false }
  },
  jobType: { 
    type: String, 
    enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Remote'],
    required: true 
  },
  experienceLevel: {
    type: String,
    enum: ['Entry', 'Mid', 'Senior', 'Executive']
  },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' },
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isRemote: { type: Boolean, default: false }
  },
  visaSponsorship: { type: Boolean, default: false },
  relocationAssistance: { type: Boolean, default: false },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date },
  isActive: { type: Boolean, default: true },
  skills: [{ type: String }],
  industry: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for faster search
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ location: '2dsphere' });
jobSchema.index({ company: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ experienceLevel: 1 });

module.exports = mongoose.model('Job', jobSchema);
