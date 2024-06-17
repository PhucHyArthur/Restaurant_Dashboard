import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js"
import { addFood } from "../controllers/food.controller.js"

const router = express.Router()

router.post("/add", protectRoute, addFood) 

export default router