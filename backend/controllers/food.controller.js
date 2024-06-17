import Food from "../models/foodModel.js";
import Category from "../models/categoryModel.js";
import Restaurant from "../models/restaurantModel.js"

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

export const getFoodList = async (req, res) => {
    try {
        const {restaurantId} = req.params
        const foods = await Food.find({ restaurantId });

        for (let i = 0; i < foods.length; i++) {
            const categories = await Category.findById(foods[i].categories);
            foods[i].categories = [categories.name];
        }
        
        res.status(200).json({ message: 'Food list retrieved successfully', foods });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getFoodById = async (req, res) => {
    try {
        const {id} = req.params
        const food = await Food.findById(id);
        const categories = await Category.findById(food.categories);
        const restaurant = await Restaurant.findById(food.restaurantId);
        // console.log(food);
        const newFood = {
            _id: food._id,
            name: food.name,
            categories: [categories],
            price: food.price,
            description: food.description,
            image: food.image,
            restaurantId: food.restaurantId,
            restaurantName : restaurant.name,
            ingredients: food.ingredients,
            createdAt: food.createdAt,
            updatedAt: food.updatedAt,
            __v: food.__v
        }
        res.status(200).json({ message: 'Food retrieved successfully', food: newFood });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}