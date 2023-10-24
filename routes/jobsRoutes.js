import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJobsController,
  getAllJobsController,
  getSearchJobsController,
  JobsApplyController,
  jobStatsController,
  updateJobsContrller,
} from "../controllers/jobsControllers.js";

const router = express.Router();

/* ROUTES */
/* CREATE JOB || POST */
router.post("/create-job", userAuth, createJobController);

/* GET JOBS || GET */
// router.get("/get-job", userAuth, getAllJobsController);

router.get("/get-job",userAuth, getAllJobsController);


router.get("/get-search-job", userAuth,getSearchJobsController);

router.get("/apply-job",userAuth,JobsApplyController)

/* UPDATE JOBS || PATCH */
router.patch("/update-job/:id", userAuth, updateJobsContrller);

/*DELETE JOBS || DELETE*/
router.delete("/delete-job/:id", userAuth, deleteJobsController);

/* JOBS STATS || GET */
router.get("/job-stats", userAuth, jobStatsController);

export default router;
