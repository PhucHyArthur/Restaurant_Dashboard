import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        restaurantId: {
            type: String,
            ref: "restaurants",
            required: true,
        },
        cartItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts",
                required: true
            },
        ],
        total: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ["PENDING", "CONFIRMED", "CANCELLED", "DELIVERED"],
            default: "PENDING"
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);

export default Order;
