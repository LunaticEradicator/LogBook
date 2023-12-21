import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected : ${con.connection.host}`);
  } catch (error) {
    console.log(`Error Message : ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
