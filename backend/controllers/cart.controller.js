import Cart from "../models/cartModel.js";

export const addCart = async (req, res) => {
    try {
        const {restaurantId, foodId, username,count} = req.body;

        const newCart = new Cart({
            restaurantId,
            foodId,
            username,
            count
        })
        await newCart.save();
        res.status(201).json({message: 'Cart added successfully', cart: newCart})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}