import express from "express";
import {
  addRestaurant,
  getRestaurants,
  deleteRestaurant,
  editRestaurant,
  getRestaurantAll_Admin
} from "../controllers/restaurant.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/all", getRestaurantAll_Admin);
router.get("/", protectRoute, getRestaurants);
router.post(
  "/addRestaurant",
  protectRoute,
  addRestaurant
);
router.put('/edit/:id', protectRoute, upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ]), editRestaurant);

router.delete("/delete/:id", protectRoute, deleteRestaurant);


export default router;
