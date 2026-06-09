import dotenv from "dotenv";
dotenv.config();

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is missing from your environment variables!");
  }
  return new TextEncoder().encode(secret);
};
