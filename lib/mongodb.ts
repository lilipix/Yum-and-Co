import mongoose from "mongoose";

const myEnvVar = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(myEnvVar, {
      serverSelectionTimeoutMS: 15000, 
    });
  } catch (error) {
    console.error('Failed to connect on database',error);
  }
};

export default connectToDatabase;
