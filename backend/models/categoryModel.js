import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userId:{
      type: String,
      ref: 'users'
  },
},
  { timestamps: true }


);

const Category = mongoose.model("categories", categorySchema);

export default Category