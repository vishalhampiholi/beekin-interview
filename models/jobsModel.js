import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    job_id: {
        type: String,
        required: true
    },
    job_title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    req_experience: {
        type: Number,
        required: true
    },
    req_skills: {
        type: [String],
        required: true
    },
    createdAt:{
      type: Date,
      default: Date.now,
    }
});

export default mongoose.model("job", jobSchema);
