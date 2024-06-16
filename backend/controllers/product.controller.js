import Food from '../models/foodModel';
import { v2 as cloudinary } from 'cloudinary';

export const addProduct = async (req, res) => {
  try {
    const { name, categories, price, description, restaurantId, ingredients } = req.body;
    
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newProduct = new Food({
      name,
      categories,
      price,
      description,
      restaurantId,
      ingredients,
      image: imageUrl
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
