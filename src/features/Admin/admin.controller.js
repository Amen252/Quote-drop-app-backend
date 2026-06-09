// src/features/admin/admin.controller.js
import User from "../users/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error("Controller Error:", error.message);

    next(error);
  }
};
