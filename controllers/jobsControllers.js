import jobsModel from "../models/jobsModel.js";

/* CREATE JOBS */
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;

  // Log the data before saving
  console.log("Data to be saved:", req.body);

  try {
    const job = await jobsModel.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred while creating the job" });
  }
};

/* GET ALL JOBS  */
export const getAllJobsController = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};
