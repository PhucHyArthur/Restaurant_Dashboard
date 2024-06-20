import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Food from "../models/foodModel.js";

export const createOrder = async (req, res) => {
    try {
        const {username, restaurantId, cartItems} = req.body
        const cartsArray = [] 
        let totalPrice = 0
        for (let i = 0; i < cartItems.length; i++) {
            const cart = await Cart.findById(cartItems[i])
            const {foodId, count} = cart
            const {price} = await Food.findById(foodId)
            totalPrice += price * count
            cartsArray.push(cart)
        }
        const newOrder = new Order({
            username,
            restaurantId,
            cartItems : cartsArray,
            total : totalPrice
        })

        await newOrder.save() 
        res.status(201).json({ message: 'Order created successfully', order: newOrder })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}