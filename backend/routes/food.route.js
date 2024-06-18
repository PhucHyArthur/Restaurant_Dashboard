import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js"
import { addFood, getFoodById, getFoodList } from "../controllers/food.controller.js"

const router = express.Router()

router.post("/add", protectRoute, addFood) 

router.get("/getAllFood/:restaurantId", protectRoute, getFoodList)

router.get("/getFoodById/:id", getFoodById)

export default router