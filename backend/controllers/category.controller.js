import Category from "../models/categoryModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        categories.sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).json(categories);
        
    } catch (error) {
        res.status(500).json({ error : error.message }) 
    }
}