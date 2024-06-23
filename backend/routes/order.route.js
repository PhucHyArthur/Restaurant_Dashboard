import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js"
import { createOrder, getAllOrders, getOrder, getOrdersCount, getPendingOrders, updateOrders } from "../controllers/order.controller.js"
import { getNewOrdersEvent } from "../controllers/event.controller.js"

const router = express.Router()


// GET
router.get("/getAllOrders", protectRoute, getAllOrders) 

router.get("/getOrdersCount", protectRoute, getOrdersCount) 

router.get("/getPendingOrders", protectRoute, getPendingOrders)

router.get("/getOrder/:id", protectRoute, getOrder)

// router.get("/getEvent", protectRoute, getNewOrdersEvent)

// POST
router.post("/createOrder", createOrder)  

// PUT
router.put("/updateOrders/:id", updateOrders) 


export default router