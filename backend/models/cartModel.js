import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        foodId: 
        { type: String, 
            ref: 'foods', 
            required: true 
        },
        restaurantId: 
        { type: String, 
            ref: 'restaurants', 
            required: true },
        username: 
        { type: String, 
            required: true 
        },
        count: { 
            type: Number, 
            required: true 
        },
    },
    { timestamps: true }
);

const Cart = mongoose.model("carts", cartSchema);

export default Cart;