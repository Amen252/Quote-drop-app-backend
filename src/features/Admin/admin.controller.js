// src/features/admin/admin.controller.js
import User from '../users/user.model.js';

export const getAllUsers = async (req, res, next) => {
  try {
    // 1. Double check that your Mongoose model is connected and working
    const users = await User.find({}).select('-password');
    
    // 2. Send back a clear JSON response
    return res.status(200).json(users);
  } catch (error) {
    console.error("Controller Error:", error.message);
    // Pass the error to your express error handler instead of crashing the server
    next(error); 
  }
};