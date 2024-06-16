import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import cookie from "cookie";

const RestaurantAdd = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    // Lấy token từ cookie
    const cookies = cookie.parse(document.cookie);
    const token = cookies.token; // Assumed the token name is `token`
    if (token) {
      const decoded = jwt_decode(token);
      setUserID(decoded.userId); // Giả sử userId nằm trong payload của token
    }

    // Lấy danh sách categories từ backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
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
      const logoUpload = data.logo[0] ? await uploadFileToCloudinary(data.logo[0]) : "";
      const posterUpload = data.poster[0] ? await uploadFileToCloudinary(data.poster[0]) : "";
      const coverUpload = data.cover[0] ? await uploadFileToCloudinary(data.cover[0]) : "";

      // Create restaurant data object
      const restaurantData = {
        name: data.name,
        email: data.email,
        location: data.location,
        description: data.description,
        categories: data.categories, // Chuyển thành mảng các categoryId
        userId: userID, // Sử dụng userID từ token
        images: {
          logo: logoUpload,
          poster: posterUpload,
          cover: coverUpload,
        },
      };

      // Send restaurant data to backend
      const response = await axios.post("/api/restaurant/addRestaurant", restaurantData);
      console.log("Restaurant added successfully:", response.data);
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  const uploadFileToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET"); // Replace with your Cloudinary upload preset

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/image/upload", // Replace with your Cloudinary cloud name
      formData
    );

    return response.data.secure_url;
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
        <div className="items-center gap-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text" placeholder="Your Restaurant Name" className="input input-bordered w-full"
            />
            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
          </div>
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
            rows="5"
            placeholder="Your Restaurant's Description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categories</label>
          <div className="mt-2">
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Logo</label>
          <input
            type="file"
            {...register("logo")}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Poster</label>
          <input
            type="file"
            {...register("poster")}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cover</label>
          <input
            type="file"
            {...register("cover")}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary">
            Add Restaurant
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantAdd;