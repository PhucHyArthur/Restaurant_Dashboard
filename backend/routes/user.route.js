import express from "express";
import {
  addUser,
  deleteUser,
  editUser,
  getUserAll,
  editPassword
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
// import multer from "multer";

const router = express.Router();

router.get("/all", getUserAll);
//
// router.get("/", protectRoute, getRestaurant);
router.post("/adduser", addUser);
router.put(
  "/edit",
  protectRoute,
  editUser
);

router.put("/editPassword", protectRoute, editPassword)

router.delete("/delete/:id", deleteUser);

export default router;
