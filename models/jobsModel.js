import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is Require"],
    },
    position: {
      type: String,
      required: [true, "Job position is Require"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Pending", "Rejected", "Interview"],
      default: "Pending",
    },
    workType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      default: "Full-Time",
    },
    workLocation: {
      type: String,
      default: "Mumbai",
      required: [true, "Work Location is Required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
