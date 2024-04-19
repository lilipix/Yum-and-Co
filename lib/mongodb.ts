import mongoose from "mongoose";

const myEnvVar = process.env.MONGODB_URI as string;

const connectToDatabase = async () => {
  console.log('Tentative de connexion à la base de données avec', myEnvVar);
  try {
    await mongoose.connect(myEnvVar);
    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Failed to connect on database',error);
  }
};

export default connectToDatabase;
