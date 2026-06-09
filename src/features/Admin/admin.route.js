import express from "express";
import { protect, isAdmin } from "../../middleware/auth.middleware.js";
import { getAllUsers } from "./admin.controller.js";
const router = express.Router();

router.use(protect);
router.use(isAdmin("admin"));
router.get("/Users", getAllUsers);

export default router;
