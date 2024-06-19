import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        foodId: 
        { type: mongoose.Schema.Types.ObjectId, 
            ref: 'foods', 
            required: true 
        },
        restaurantId: 
        { type: mongoose.Schema.Types.ObjectId, 
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