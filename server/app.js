import cors from "cors";
import express from "express";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import marksheetRoutes from './routes/MarksheetRoutes.js';
import { protect } from "./middleware/authMiddleware.js";
import morgan from 'morgan';
import Session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from 'dotenv';
dotenv.config({path: "./variables.env"});

const app = express();

// For logging requests coming to the server
app.use(morgan("dev"));


// Handling JSON data in REST APIs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// CORS setup
// Only responds to requests coming from http://localhost:5173
// This is the port where the React app is running
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Initialize session
app.use(Session({
  name: "user-session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
  cookie:{
    secure: process.env.NODE_ENV!=="development",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 1, // expires in 24 hours
  }
}));

app.use("/api/user", userRoutes);
app.use("/api/marksheet", protect, marksheetRoutes);

// For handling errors, refer to the "middleware/errorHandler.js" file
app.use(notFound);
app.use(errorHandler);

export default app;