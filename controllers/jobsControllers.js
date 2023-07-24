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
  const { status, workType, search, sort } = req.query;
  /* CONDITION FOR SEACRH FILTER */
  const queryObject = {
    createdBy: req.user.userId,
  };
  /*LOGIC FOR  FILTER */
  //STATUS filter
  if (status && status !== "all") {
    queryObject.status = status;
  }
  //WORKTYPE filter
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  //SERACH filter by position uppercase or lowercase
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = jobsModel.find(queryObject);

  /*          SORTING            */
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  // for the reverse or the oldest
  if (sort == "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  // for the alphabatical order
  if (sort == "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort == "z-a") {
    queryResult = queryResult.sort("-position");
  }

  /*        PAGINATION      */
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);
  /* JOBS COUNT VARIABLE */
  const totalJobs = await jobsModel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs / limit);
  const jobs = await queryResult;

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs,
    jobs,
    numOfPage,
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
