import mongoose from "mongoose";

const connectToDb = async (uri: string) => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    throw error;
    process.exit(1);
  }
};

export default connectToDb;
