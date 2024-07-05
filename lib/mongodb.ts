import mongoose from "mongoose";

// const myEnvVar = process.env.MONGODB_URI as string;

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(myEnvVar, { serverSelectionTimeoutMS: 50000 });
//   } catch (error) {
//     console.error("Failed to connect on database", error);
//   }
// };

// export default connectToDatabase;
const myEnvVar = process.env.MONGODB_URI as string;
const connectToDatabase = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Failed to connect to MongoDB", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });

    await mongoose.connect(myEnvVar, {
      serverSelectionTimeoutMS: 50000,
    });

    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error; // Propager l'erreur pour la gestion ultérieure
  }
};

export default connectToDatabase;
