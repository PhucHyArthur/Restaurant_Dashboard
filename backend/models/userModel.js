import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "owner"],
      default: "owner",
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
