import Restaurant from "../models/restaurantModel.js";
import { v2 as cloudinary } from 'cloudinary';
import User from "../models/userModel.js";
import Food from "../models/foodModel.js";
import Category from "../models/categoryModel.js";
import jwt from "jsonwebtoken";
import Order from "../models/orderModel.js";

export const addRestaurant = async (req, res) => {
  try {
    const { name, categories, email, location, description, images } = req.body;
    
    const userId = req.user._id.toString();
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newRestaurant = new Restaurant({
      name,
      categories,
      email,
      location,
      description,
      images,
      userId: req.user._id
    });

    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRestaurants = async (req, res) => {
  const userId = req.user._id; // User ID from protectRoute middleware

  try {
    const restaurants = await Restaurant.find({ userId });
    const user = await User.findById(userId)
    const newRestaurants = []
    for (let i = 0; i < restaurants.length; i++) {
      const categories = await Category.findById(restaurants[i].categories);
      const foodCount = await Food.countDocuments({ restaurantId: restaurants[i]._id });

      const newRestaurant = {
        name : restaurants[i].name,
        email : restaurants[i].email,
        location : restaurants[i].location,
        description : restaurants[i].description,
        images : restaurants[i].images,
        categories : [categories],
        _id : restaurants[i]._id,
        userId : restaurants[i].userId,
        userName : user.name,
        updatedAt : restaurants[i].updatedAt,
        createdAt : restaurants[i].createdAt,
        totalProducts : foodCount,
        totalSales : 0
      }
      newRestaurants.push(newRestaurant)
    }
    res.status(200).json(newRestaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRestaurant = async (req, res) => {
  const restaurantId = req.params.id
  try {
    const restaurant = await Restaurant.findById(restaurantId).populate('userId').populate('categories'); 
    // const categories = await Category.findById(restaurant.categories);
    const foodCount = await Food.countDocuments({ restaurantId });
    
    const orders = await Order.find({ restaurantId: restaurantId });
    let totalSales = 0;
    for (let i = 0; i < orders.length; i++) {
      totalSales += orders[i].total;
    }

    const newRestaurant = {
      ...restaurant._doc,
      totalProducts : foodCount,
      totalSales : totalSales
    }
    res.status(200).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const userId = req.user._id; // User ID từ middleware protectRoute

  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId, userId });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found or you are not authorized to delete it" });
    }

    await Restaurant.deleteOne({ _id: restaurantId, userId });
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
  const userId = req.user._id; // User ID từ middleware protectRoute

  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId, userId });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found or you are not authorized to edit it" });
    }

    const { name, categories, email, location, description } = req.body;

    let logoUrl = restaurant.images.logo;
    let posterUrl = restaurant.images.poster;
    let coverUrl = restaurant.images.cover;

    if (req.files && req.files.logo) {
      const result = await cloudinary.uploader.upload(req.files.logo[0].path);
      logoUrl = result.secure_url;
    }

    if (req.files && req.files.poster) {
      const result = await cloudinary.uploader.upload(req.files.poster[0].path);
      posterUrl = result.secure_url;
    }

    if (req.files && req.files.cover) {
      const result = await cloudinary.uploader.upload(req.files.cover[0].path);
      coverUrl = result.secure_url;
    }

    restaurant.name = name || restaurant.name;
    restaurant.categories = categories ? categories.split(',') : restaurant.categories; // Assuming categories are passed as a comma-separated string
    restaurant.email = email || restaurant.email;
    restaurant.location = location || restaurant.location;
    restaurant.description = description || restaurant.description;
    restaurant.images = {
      logo: logoUrl,
      poster: posterUrl,
      cover: coverUrl
    };

    await restaurant.save();
    res.status(200).json({ message: 'Restaurant updated successfully', restaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ---------------------------------------------------------ADMIN---------------------------------------------
export const getRestaurantAll_Admin = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("userId", "name");
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};