
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import uploadFileCloudinary from "../../actions/UploadFileCloudinary";
import axios from "axios";
import Form from "../components/form";

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [restaurants, setRestaurants] = useState
    ([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    // Fetch data from the backend
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
        const response = await axios.get("/api/category/")
        if (response.status === 200) {
          setCategories(response.data)
        }
      } catch (error) {
        console.error("Error fetching categories: ", error)

      }
    }
    fetchRestaurants();
    fetchCategories()
  }, [])

  const onSubmit = async (data) => {
    // Handle form submission, e.g., sending data to the backend
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

      const response = await axios.post('/api/food/add', productData)
      console.log("Food added successfully", response.data);
      reset()
    } catch (error) {
      console.error("Error adding food: ", error)
    }
  };


  return (
    <Form handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} restaurants={restaurants} categories={categories} />
  );
};

export default ProductAdd;
