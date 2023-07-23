import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  getAllJobsController,
} from "../controllers/jobsControllers.js";

const router = express.Router();

/* ROUTES */
/* CREATE JOB || POST */
router.post("/create-job", userAuth, createJobController);

/* GET JOBS || GET */
router.get("/get-job", userAuth, getAllJobsController);

export default router;
