
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import uploadFileCloudinary from "../../actions/UploadFileCloudinary";
import axios from "axios";
import Form from "../components/form";
import CustomToast from "../../../components/Toast";

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [restaurants, setRestaurants] = useState
    ([])
  const [categories, setCategories] = useState([])
  const [imageSource, setImageSource] = useState("")
  const showToast = CustomToast()

  const watchFile = watch('image', null)

  useEffect(() => {
    if (watchFile && typeof watchFile === 'string') {
      setImageSource(watchFile)
    }
    if (watchFile && watchFile.length > 0 && typeof watchFile === 'object') {
      setImageSource(URL.createObjectURL(watchFile[0]))
    }
  }, [watchFile])

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
      showToast('success', 'Food added successfully', '')
      reset()
      setImageSource("")
    } catch (error) {
      showToast('error', 'Food added failed', '')
      console.error("Error adding food: ", error)
    }
  };


  return (
    <Form title={"Add"} handleSubmit={handleSubmit} imageSource={imageSource} onSubmit={onSubmit} errors={errors} register={register} restaurants={restaurants} categories={categories} />
  );
};

export default ProductAdd;
