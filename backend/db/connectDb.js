import mongoose, { mongo } from "mongoose";

const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected`);

  
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDb;