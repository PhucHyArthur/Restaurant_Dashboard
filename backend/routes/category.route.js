import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js"
import { getCategories } from "../controllers/category.controller.js";

const router = express.Router()

router.get("/", protectRoute, getCategories) 

export default router