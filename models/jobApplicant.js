import mongoose from "mongoose";
const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type:  mongoose.Schema.Types.ObjectId,
    ref:'job',
    required: true,
  },
  applicants:  [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Reference to the User schema
      required: true,
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
  }],
});


export default mongoose.model("JobApplication", jobApplicationSchema);