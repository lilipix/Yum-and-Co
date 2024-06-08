import mongoose from "mongoose";

const myEnvVar = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  console.log("Attempting to connect to MongoDB...");
  try {
    await mongoose.connect(myEnvVar, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000, 
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error('Failed to connect on database',error);
  }
};

export default connectToDatabase;
