import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import express from "express";
import rateLimit from "express-rate-limit";

/*IP LIMIT */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/* ROUTER OBJECT */
const router = express.Router();

/* ROUTES */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Firstname
 *         - lastname
 *         - email
 *         - mobileNo
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-Generated id of the user collection
 *         Firstname:
 *           type: string
 *           description: User Firstname
 *         lastname:
 *           type: string
 *           description: User lastname
 *         email:
 *           type: string
 *           description: User email address
 *         mobileNo:
 *           type: number
 *           description: User mobile number
 *         password:
 *           type: string
 *           description: Password length should be greater than 8 characters
 *         location:
 *           type: string
 *           description: User location (city or country)
 *       example:
 *         id: SDFSFRDDSDFSF
 *         Firstname: Jack
 *         lastname: Ryan
 *         email: jack.ryan@gmail.com
 *         mobileNo: 7890092123
 *         password: 12345678
 *         location: Washington
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: resgister new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: user created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         500:
 *           description: internal server error
 */

/*ROUTERs*/
/* REGISTER || POST */
router.post("/register", limiter, registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: login Page
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: login successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         500:
 *           description: something went wrong
 */
/* LOGIN || POST */
router.post("/login", limiter, loginController);
/*EXPORT */
export default router;
