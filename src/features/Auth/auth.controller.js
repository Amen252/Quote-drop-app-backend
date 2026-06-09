import User from "../Schemas/user.schema.js";
import { generateToken } from "../utils/generateToken.js";

//register user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      res.status(400);
      throw new Error("All feilds are required!");
    }

    //check if the user exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User with this email already exists");
    }

    const user = await User.create({ name, email, password });
    //generate Tokens
    const payload = { userId: user._id.toString() };
    const accessToken = await generateToken(payload, "15m");
    res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

//login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email?.trim() || !password?.trim()) {
      res.status(400);
      throw new Error("Email and password are required!");
    }
    //check if the user is valid
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("Invalid credentials!");
    }

    //check the password
    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid credentials!");
    }

    //generate Tokens
    const payload = { userId: user._id.toString() };
    const accessToken = await generateToken(payload, "15m");
    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
