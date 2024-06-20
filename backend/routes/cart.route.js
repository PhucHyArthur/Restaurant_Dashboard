import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js"
import { addCart } from "../controllers/cart.controller.js";

const router = express.Router()

router.post("/addCart", addCart)

export default router