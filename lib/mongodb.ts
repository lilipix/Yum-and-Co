import mongoose from "mongoose";

const myEnvVar = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(myEnvVar);
  } catch (error) {
    console.error(error);
  }
};

export default connectToDatabase;
