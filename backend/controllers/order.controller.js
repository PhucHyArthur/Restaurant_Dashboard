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
        const userId = req.user._id
        const restaurants = await Restaurant.find({ userId })
        const restaurantIds = restaurants.map(restaurant => restaurant._id);
        const orders = await Order.find({ restaurantId: { $in: restaurantIds } }).populate('restaurantId').populate('cartItems')
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
        const orders = await Order.find({ restaurantId: { $in: restaurantIds }, status: 'PENDING' }).populate('restaurantId').populate('cartItems')
        const newOrders = JSON.parse(JSON.stringify(orders))
        for (let i = 0; i < orders.length; i++) {
            newOrders[i].id = i
            for (let j = 0; j < orders[i].cartItems.length; j++) {
                const foodId = orders[i].cartItems[j].foodId
                const {name} = await Food.findById(foodId) 
                newOrders[i].cartItems[j].foodName = name
            }
        }
        res.status(200).json(newOrders)
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

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('restaurantId').populate('cartItems')   
        const newOrder = JSON.parse(JSON.stringify(order))
        for (let i = 0; i < order.cartItems.length; i++) {
            const foodId = order.cartItems[i].foodId
            const {name, image, price} = await Food.findById(foodId) 
            newOrder.cartItems[i].foodName = name
            newOrder.cartItems[i].foodImage = image
            newOrder.cartItems[i].foodPrice = Number.parseInt(price)
        }
        res.status(200).json(newOrder)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



