import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJobsController,
  getAllJobsController,
  jobStatsController,
  updateJobsContrller,
} from "../controllers/jobsControllers.js";

const router = express.Router();

/* ROUTES */
/* CREATE JOB || POST */
router.post("/create-job", userAuth, createJobController);

/* GET JOBS || GET */
router.get("/get-job", userAuth, getAllJobsController);

/* UPDATE JOBS || PATCH */
router.patch("/update-job/:id", userAuth, updateJobsContrller);

/*DELETE JOBS || DELETE*/
router.delete("/delete-job/:id", userAuth, deleteJobsController);

/* JOBS STATS || GET */
router.get("/job-stats", userAuth, jobStatsController);

export default router;
