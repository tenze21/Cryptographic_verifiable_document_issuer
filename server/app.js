import cors from "cors";
import express from "express";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';


const app = express();

// Handling JSON data in REST APIs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;