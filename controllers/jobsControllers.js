import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

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
const allJobs=await jobsModel.find().exec()

  return res.status(200).json({
    allJobs
  });
};

/* UPDATE JOB */
export const updateJobsContrller = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  /* VALIDATION */
  if (!company || !position) {
    next("Please Provide the All Fields");
  }
  /* FIND JOBS */
  const jobs = await jobsModel.findOne({ _id: id });
  /* VALIDATION */
  if (!jobs) {
    next(`No jobs found with this id ${id}`);
  }
  if (!req.user.userId === jobs.createdBy.toString()) {
    next("Your not Authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  /* RESPONSE */
  res.status(200).json({ updateJob });
};

/* DELETE JOBS */
export const deleteJobsController = async (req, res, next) => {
  const { id } = req.params;
  /* FIND JOBS */
  const jobs = await jobsModel.findOne({ _id: id });
  /* VALIDATION */
  if (!jobs) {
    next(`No job Found with This ID ${id}`);
  }
  if (!req.user.userId === jobs.createdBy.toString()) {
    next("Your Not Authorized to delete this job");
    return;
  }
  await jobs.deleteOne();
  res.status(200).json({ message: "Job deleted Successfully!!!" });
};

/* JOB STATS */
export const jobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    /* SEARCH by user jobs */
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  /* DEFAULT STATS */
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  /* MONTHLY - YEARLY STATS */

  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: { $toDate: "$createdAt" } },
          month: { $month: { $toDate: "$createdAt" } },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year - 1)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({ totalJobs: stats.length, defaultStats, monthlyApplication });
};
