import mongoose from "mongoose";

const url = process.env.DATABASE_URL;
let connection;

const startDb = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(url);
    }
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export default startDb;
