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
        const foods = await Food.find({ restaurantId, softDelete: false });

        for (let i = 0; i < foods.length; i++) {
            const categories = await Category.findById(foods[i].categories);
            foods[i].categories = [categories];
        }
        
        res.status(200).json({ message: 'Food list retrieved successfully', foods });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getFoodById = async (req, res) => {
    try {
        const {id} = req.params
        const food = await Food.findOne({ _id: id, softDelete: false });
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
            available: food.available,
            createdAt: food.createdAt,
            updatedAt: food.updatedAt,
            __v: food.__v
        }
        res.status(200).json({ message: 'Food retrieved successfully', food: newFood });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, categories, price, restaurantId, ingredients, description, image, available } = req.body;
        const updatedFood = {
            name,
            categories,
            price,
            description,
            image,
            restaurantId,
            ingredients,
            available
        };
        // console.log(updatedFood);
        const food = await Food.findByIdAndUpdate(id, updatedFood, { new: true });
        res.status(200).json({ message: 'Food updated successfully', food });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        await Food.findByIdAndDelete(id);
        res.status(200).json({ message: 'Food deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const softDeleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findOne({ _id: id, softDelete: false });
        const updatedFood = {
            name : food.name,
            categories : food.categories,
            price : food.price,
            description: food.description,
            image : food.image,
            restaurantId: food.restaurantId,
            ingredients : food.ingredients,
            available : food.available,
            softDelete: true
        };
        // console.log(updatedFood);
        await Food.findByIdAndUpdate(id, updatedFood, { new: true })
        .then((data) => {
            res.status(200).json({ message: 'Food soft deleted successfully' , food: data});
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}