import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDb = () => {
  const uri = process.env.MONGO_URI;
  console.log("Attempting to connect to:", uri); // Add this line for debugging
  
  return mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.log("MongoDB connection error:", err);
    });
};

export default connectDb;