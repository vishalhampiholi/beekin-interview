import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import express from "express";

/* ROUTER OBJECT */
const router = express.Router();

/*ROUTERs*/
router.post("/register", registerController);
router.post("/login", loginController);
/*EXPORT */
export default router;
