import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({path: "./variables.env"});

const PORT= process.env.PORT;
let server;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");

    server = app.listen(PORT, () => {
      console.log(`application running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on("SIGINT", () => {
  console.log("shutting down...");

  // close the HTTP server first
  if (server) {
    server.close(() => {
      console.log("HTTP server closed");

      // close the mongoDB connection
      mongoose.connection.close(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
      });
    });
  } else {
    // If there's no active server, close MongoDB directly
    mongoose.connection.close(() => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  }
});