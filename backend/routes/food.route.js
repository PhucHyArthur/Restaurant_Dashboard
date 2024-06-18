import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js"
import { addFood, getFoodById, getFoodList, updateFood, deleteFood, softDeleteFood } from "../controllers/food.controller.js"

const router = express.Router()

router.post("/add", protectRoute, addFood) 

router.get("/getAllFood/:restaurantId", protectRoute, getFoodList)

router.get("/getFoodById/:id", protectRoute, getFoodById)

router.put("/update/:id", protectRoute, updateFood)

router.delete("/delete/:id", deleteFood)

router.put("/softDelete/:id", softDeleteFood)

export default router