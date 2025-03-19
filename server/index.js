import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Handling JSON data in REST APIs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", userRoutes);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

app.use(notFound);
app.use(errorHandler);