import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Box, Flex } from "@chakra-ui/react";
import CustomToast from "../../../components/Toast";
import uploadFileCloudinary from "../../actions/UploadFileCloudinary";

const RestaurantAdd = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const showToast = CustomToast()

  useEffect(() => {
    // Lấy danh sách categories từ backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Upload files to Cloudinary
      const logoUpload = data.logo[0] ? await uploadFileCloudinary(data.logo[0]) : "";
      const posterUpload = data.poster[0] ? await uploadFileCloudinary(data.poster[0]) : "";
      const coverUpload = data.cover[0] ? await uploadFileCloudinary(data.cover[0]) : "";
      console.log(logoUpload);
      // Create restaurant data object
      const restaurantData = {
        name: data.name,
        email: data.email,
        location: data.location,
        description: data.description,
        categories: data.categories, // Chuyển thành mảng các categoryId
        images: {
          logo: logoUpload,
          poster: posterUpload,
          cover: coverUpload,
        },
      };

      // Send restaurant data to backend
      const response = await axios.post("/api/restaurant/addRestaurant", restaurantData);
      if (response.status === 200) {
        showToast("success","Restaurant added successfully","")
        reset()
      }
    } catch (error) {
      showToast("error","Restaurant added failed","")
      console.error("Error adding restaurant:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Restaurant Add</h4>
        <ol className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2">
          <li className="text-sm">
            <a className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500">
              Restaurant
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right w-4 h-4"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </a>
          </li>
          <li
            aria-current="page"
            className="text-sm font-medium text-primary truncate leading-none hover:text-primary-500"
          >
            Restaurant Add
          </li>
        </ol>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Box className="grid grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text" placeholder="Your Restaurant Name" className="input input-bordered w-full"
            />
            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="text" placeholder="Your Email" className="input input-bordered w-full"
            />
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              {...register("location", { required: "Location is required" })}
              type="text" placeholder="Your Restaurant's Location" className="input input-bordered w-full"
            />
            {errors.location && <span className="text-red-600">{errors.location.message}</span>}
          </div>
        </Box>

        <Box className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register("description")}
              className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent mt-2"
              rows="4"
              placeholder="Your Restaurant's Description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <div className="mt-2 grid grid-cols-5">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center">
                  <input
                    type="checkbox"
                    value={category._id}
                    {...register("categories")}
                    className="mr-2"
                  />
                  <label>{category.name}</label>
                </div>
              ))}
            </div>
          </div>
        </Box>

        <Flex className="items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo</label>
            <input
              type="file"
              {...register("logo")}
              className="mt-1 cursor-pointer block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Poster</label>
            <input
              type="file"
              {...register("poster")}
              className="mt-1 cursor-pointer block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cover</label>
            <input
              type="file"
              {...register("cover")}
              className="mt-1 cursor-pointer block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </Flex>

        <div className="flex justify-center">
          <button className=""type="submit">
            Add Restaurant
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantAdd;