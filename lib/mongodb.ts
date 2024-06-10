import mongoose from "mongoose";

const myEnvVar = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(myEnvVar, {});
  } catch (error) {
    console.error("Failed to connect on database", error);
  }
};

export default connectToDatabase;
