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

export const updateCart = async (req, res) => {
    try {
        const {id} = req.params;    
        const {restaurantId, foodId, username,count} = req.body;
        const updatedCart = {
            restaurantId, 
            foodId, 
            username,
            count
        };
        const cart = await Cart.findByIdAndUpdate(id, updatedCart, {new: true});
        res.status(200).json({message: 'Cart updated successfully', cart}); 
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}