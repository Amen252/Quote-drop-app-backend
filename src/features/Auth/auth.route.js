import express from "express";
import { registerUser } from "./auth.controller.js";
import { loginUser } from "./auth.controller.js";
const router = express.Router();

//register
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
