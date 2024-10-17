import mongoose from "mongoose";

// const myEnvVar = process.env.MONGODB_URI as string;

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(myEnvVar, {});
//   } catch (error) {
//     console.error("Failed to connect on database", error);
//   }
// };

// export default connectToDatabase;

const myEnvVar = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(myEnvVar, {
      serverSelectionTimeoutMS: 30000, // Timeout de sélection du serveur après 30 secondes
      socketTimeoutMS: 45000, // Ferme les sockets après 45 secondes d'inactivité
      connectTimeoutMS: 30000, // Timeout de connexion après 30 secondes
    });
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Failed to connect to database", error);
  }
};

export default connectToDatabase;
