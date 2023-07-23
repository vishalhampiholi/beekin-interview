import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  getUserController,
  updateUserController,
} from "../controllers/userControllers.js";

/* ROUTER OBJECT */
const router = express.Router();

/*ROUTES */
/* GET USERS || GET */
router.get("/get-user", userAuth, getUserController);
/* UPDATE USER || PUT */
router.put("/update-user", userAuth, updateUserController);
export default router;
