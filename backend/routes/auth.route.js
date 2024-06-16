import express from "express";
import { getMe, registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;