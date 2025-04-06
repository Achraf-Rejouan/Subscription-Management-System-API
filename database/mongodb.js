import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from "../config/env.js";

if (!DB_URI) {
  throw new Error("DB_URI is not defined in the environment variables.");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`MongoDB connected in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with failure
  };
};

export default connectToDatabase;