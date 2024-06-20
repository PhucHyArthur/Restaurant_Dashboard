import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js"
import { addCart, updateCart } from "../controllers/cart.controller.js";

const router = express.Router()

router.post("/addCart", addCart)

router.put("/updateCart/:id", updateCart)

export default router