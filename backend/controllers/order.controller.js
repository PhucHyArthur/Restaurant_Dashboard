import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Food from "../models/foodModel.js";
import Restaurant from "../models/restaurantModel.js";

export const createOrder = async (req, res) => {
    try {
        const {username, restaurantId, cartItems} = req.body
        const cartsArray = [] 
        let totalPrice = 0
        for (let i = 0; i < cartItems.length; i++) {
            const cart = await Cart.findById(cartItems[i])
            const {foodId, count} = cart
            const {price} = await Food.findById(foodId)
            totalPrice += Number.parseInt(price) * count
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

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getPendingOrders = async (req, res) => {
    try {
        const userId = req.user._id
        const restaurants = await Restaurant.find({ userId })
        // console.log(restaurantId)
        const restaurantIds = restaurants.map(restaurant => restaurant._id);
        const orders = await Order.find({ restaurantId: { $in: restaurantIds }, status: 'PENDING' }).populate('cartItems').populate('restaurantId');
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateOrders = async (req, res) => {
    try {
        const orderId = req.params.id
        const {status} = req.body
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
}

export const getOrdersCount = async (req, res) => {
    try {
        const userId = req.user._id
        const restaurants = await Restaurant.find({ userId })
        // console.log(restaurantId)
        const restaurantIds = restaurants.map(restaurant => restaurant._id);
        const orders = await Order.find({ restaurantId: { $in: restaurantIds } });

        const count = {
            pending : orders.filter(order => order.status === 'PENDING').length,
            confirmed : orders.filter(order => order.status === 'CONFIRMED').length,
            cancelled : orders.filter(order => order.status === 'CANCELLED').length,
            delivered : orders.filter(order => order.status === 'DELIVERED').length,
            revenue : orders.filter(order => order.status === 'CONFIRMED').reduce((acc, order) => acc + order.total, 0)
        }
        res.status(200).json(count)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getConfirmedOrdersCount = async (req, res) => {
    try {
        const orders = await Order.find({ status: 'CONFIRMED' })
        res.status(200).json(orders.length)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


