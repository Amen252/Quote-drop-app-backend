import { SignJWT } from "jose";
import { getJwtSecret } from "./getJwtSecret.js";

export const generateToken = async (payload, expiresIn = "15m") => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Ensure 'alg' is a valid string, 'typ' is optional but good practice
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
};
