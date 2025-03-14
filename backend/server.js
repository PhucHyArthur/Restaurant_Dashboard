// Định nghĩa các Routes

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.route.js"
import restaurantRoutes from "./routes/restaurant.route.js"
import foodRoutes from './routes/food.route.js'
import categoryRoutes from './routes/category.route.js'
import userRoutes from "./routes/user.route.js" 
import orderRoutes from "./routes/order.route.js"
import cartRoutes from "./routes/cart.route.js"

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes)
app.use("/api/cart", cartRoutes)


//------------------------------------------ADMIN----------------------------------------------------
app.use("/api/user", userRoutes);
//----------------------------------------------------------------------------------------------------

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
