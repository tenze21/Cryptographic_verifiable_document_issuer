import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import USER from "./models/userModel.js";

dotenv.config({ path: "./variables.env" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const importData = async () => {
  try {
    await USER.deleteMany();
    await USER.insertMany(users);
    console.log("Data imported successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await USER.deleteMany();
    console.log("Data destroyed successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
};
