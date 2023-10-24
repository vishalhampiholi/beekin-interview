/* Import */
// const express = require("express");  /* common js syntax*/
/* SWAGGER API Documentation */
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
/* PACKAGES IMPORT */
import express from "express"; /*module js syntax*/
import dotenv from "dotenv";
import "express-async-errors";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
/* SECURITY PACKAGES */
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
/* FILES IMPORT */
import connectDB from "./config/db.js";
/*ROUTES IMPORT */
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

/* Dot ENV config */
dotenv.config();

/* MongoDB Connection  */
connectDB();

/* SWAGGER API CONFIG */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "Node Expressjs Job Portal",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spec = swaggerDoc(options);

/* REST OBJECT */
const app = express();

/* MIDDLEWARE */
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/* ROUTE */
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

/*HOME ROUTE ROOT */
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

/* VALIDATION MIDDLEWARE */
app.use(errorMiddleware);

/* PORT */
const PORT = process.env.PORT || 3001;

/* listen */
app.listen(PORT, () => {
  console.log(
    `Node server Running in ${process.env.DEV_MODE} Mode port no ${PORT}`.bgCyan
      .red
  );
});
