import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import uploadFileCloudinary from "../../actions/UploadFileCloudinary";
import Form from "../components/form";

const ProductEdit = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/food/getFoodById/${productId}`);
        if (response.status === 200) {
          const product = response.data.food;
          setValue("name", product.name);
          setValue("image", product.image);
          setValue("description", product.description);
          setValue("ingredients", product.ingredients);
          setValue("price", product.price);
          setValue("categories", product.categories[0]._id);
          setValue("restaurantId", product.restaurantId);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("/api/restaurant/");

        if (response.status === 200) {
          setRestaurants(response.data);
        }
      } catch (error) {
        console.error("Error fetching restaurants: ", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category/");
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchProduct();
    fetchCategories()
    fetchRestaurants()
  }, []);

  const onSubmit = async (data) => {
    try {
      const imageUpload = data.image[0] ? await uploadFileCloudinary(data.image[0]) : ''
      const productData = {
        name: data.name,
        categories: data.categories,
        price: data.price,
        restaurantId: data.restaurantId,
        ingredients: data.ingredients,
        description: data.description,
        image: imageUpload
      }

      const response = await axios.put(`/api/food/update/${productId}`, productData)
      console.log("Food edited successfully", response.data);
      console.log(data)
    } catch (error) {
      console.error("Error editing food: ", error)
    }
  };

  return (
    <Form handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} restaurants={restaurants} categories={categories} />

  );
};

export default ProductEdit;
