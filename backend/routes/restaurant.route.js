// Định nghĩa các Endpoint

import express from "express";
import {
  addRestaurant,
  getRestaurants,
  deleteRestaurant,
  editRestaurant,
  getRestaurantAll_Admin,
  getRestaurant
} from "../controllers/restaurant.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/all", getRestaurantAll_Admin);
router.get("/", protectRoute, getRestaurants);

router.get("/getRestaurant/:id", getRestaurant)

router.post(
  "/addRestaurant",
  protectRoute,
  addRestaurant
);

router.put('/edit/:id', protectRoute, editRestaurant);

router.delete("/delete/:id", protectRoute, deleteRestaurant);


export default router;
