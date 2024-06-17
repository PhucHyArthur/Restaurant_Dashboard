import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    categories: {
      type:[],
      ref: 'categories'
      
    },
    price: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      
    },
    restaurantId: {
      type: String,
      ref: 'restaurants',

    },
    ingredients: {
      type: String,

    }
    
  },
  { timestamps: true }

);

const Food = mongoose.model("foods", foodSchema);

export default Food;