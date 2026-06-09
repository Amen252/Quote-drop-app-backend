import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected succesfully at ${conn.connection.name}`);
  } catch (err) {
    console.log(`error while connecting to databas:${err}`);
     process.exit(1);
  }
 
};

export default connectDB;