import Restaurant from "../models/restaurantModel.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const addUser = async (req, res) => {
  try {
    const { name, email, role, phone, address } = req.body;

    const newUser = new User({
      name,
      email,
      role,
      phone,
      address,
    });

    await newUser.save();
    res.status(201).json({
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//them list user cho admin

export const getUserAll = async (req, res) => {
  const users = await User.find();
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User not found or you are not authorized to delete it",
      });
    }

    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "user not found or you are not authorized to edit it",
      });
    }

    const { name, email, role, phone, address } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.phone = phone || user.phone;
    user.address = address || user.address;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
