import Food from "../models/foodModel.js";
export const addFood = async (req, res) => {
    try {
        console.log(req.body)
        const { name, categories, price, restaurantId, ingredients, description, image } = req.body;
        const newFood = new Food({
            name,
            categories,
            price,
            description,
            image,
            restaurantId,
            ingredients
        });

        await newFood.save();
        res.status(201).json({ message: 'Food added successfully', food: newFood });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}