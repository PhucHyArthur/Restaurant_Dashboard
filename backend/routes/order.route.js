import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js"
import { createOrder, getAllOrders, getOrdersCount, getPendingOrders, updateOrders } from "../controllers/order.controller.js"

const router = express.Router()


// GET
router.get("/getAllOrders", getAllOrders) 

router.get("/getOrdersCount", protectRoute, getOrdersCount) 

router.get("/getPendingOrders", protectRoute, getPendingOrders)

// POST
router.post("/createOrder", createOrder)  

// PUT
router.put("/updateOrders/:id", updateOrders) 


export default router