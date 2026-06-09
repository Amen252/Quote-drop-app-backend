import { jwtVerify } from "jose";
import { getJwtSecret } from "../features/utils/getJwtSecret.js"; // Adjust relative path if needed
import User from "../features/users/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not Authorized, No Token Provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token, Not Authorized" });
    }

    // Call the function to get the correct Uint8Array key
    const secretKey = getJwtSecret();

    // Await verification
    const { payload } = await jwtVerify(token, secretKey);

    // Look up user using userId (matches your registration/login payload!)
    const user = await User.findById(payload.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "No User found, Not Authorized" });
    }

    req.user = user;
    next();

  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ message: "Not Authorized, token invalid or expired" });
  }
};

export const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(401)
        .json({ message: "Not Authorized, user role missing" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user.role}' is not allowed to perform this operation`,
      });
    }

    next();
  };
};
