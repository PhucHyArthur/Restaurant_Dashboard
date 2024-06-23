import Food from "../models/foodModel.js";
import Order from "../models/orderModel.js";
import Restaurant from "../models/restaurantModel.js";

export const getNewOrdersEvent = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        
        const userId = req.user._id
        const restaurants = await Restaurant.find({ userId })
        const restaurantIds = restaurants.map(restaurant => restaurant._id);
        
        let lastChecked = new Date() 
        // console.log(lastChecked)
        const intervalId = setInterval(async () => {
            const order = await Order.findOne({
                restaurantId: { $in: restaurantIds },
                status : "PENDING",
                createdAt: { $gt: lastChecked }
            }).sort({ createdAt: -1 });

            if (order) {
                console.log("there is new order")
                const newOrder = JSON.parse(JSON.stringify(order))
                for (let j = 0; j < newOrder.cartItems.length; j++) {
                    const foodId = newOrder.cartItems[j].foodId
                    const {name} = await Food.findById(foodId)
                    newOrder.cartItems[j].foodName = name
                }
                res.write(`data: ${JSON.stringify(newOrder)}\n\n`)
                lastChecked = newOrder.createdAt
            }
        }, 5000) 
        // const intervalId = setInterval(() => {
        //     const currentTime = new Date()
        //     res.write(`data: ${currentTime}\n\n`)
        // }, 5000)

        // handle client disconnect 
        req.on('close', () => {
            console.log('Client disconnected')
            clearInterval(intervalId)
            res.end()
        })
    } catch (error) {
        console.error('SSE error:', error);
        res.end();
    }
}