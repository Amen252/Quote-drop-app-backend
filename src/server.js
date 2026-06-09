import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import userRoute from "./features/Auth/auth.route.js";
import adminRoute from './features/Admin/admin.route.js'
dotenv.config();

const server = express();

//database connection
connectDB();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//routes
server.use("/api/auth/", userRoute);
server.use("/api/admin", adminRoute);
//errorHandler
server.use(errorHandler);
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`server is running at: ${PORT}`);
});
