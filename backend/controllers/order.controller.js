import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
    try {
        const {username, restaurantId, cartItems, total} = req.body
        const newOrder = new Order({
            username,
            restaurantId,
            cartItems,
            total
        })

        await newOrder.save() 
        res.status(201).json({ message: 'Order created successfully', order: newOrder })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}