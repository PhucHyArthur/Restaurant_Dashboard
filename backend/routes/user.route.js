import express from "express";
import {
  addUser,
  deleteUser,
  editUser,
  getUserAll,
} from "../controllers/user.controller.js";
// import { protectRoute } from "../middlewares/protectRoute.js";
// import multer from "multer";

const router = express.Router();

router.get("/all", getUserAll);
//
// router.get("/", protectRoute, getRestaurant);
router.post("/adduser", addUser);
router.put(
  "/edit/:id",

  editUser
);

router.delete("/delete/:id", deleteUser);

export default router;
