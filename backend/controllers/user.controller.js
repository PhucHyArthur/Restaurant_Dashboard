import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "user not found or you are not authorized to edit it",
      });
    }

    const { name, fullname, email, role, phone, address } = req.body;
    // console.log(req.body)

    user.name = name || user.name;
    user.fullname = fullname || user.fullname;
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

export const editPassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    const { currentPassword, newPassword} = req.body
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    } 
    const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword || user.password
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}