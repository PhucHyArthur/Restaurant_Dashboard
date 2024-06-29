// RestaurantEdit.js
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import uploadFileCloudinary from "../../actions/UploadFileCloudinary";
import CustomToast from "../../../components/Toast";

const RestaurantEdit = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { restaurantId } = useParams(); // Lấy id của nhà hàng từ URL
  const [categories, setCategories] = useState([]);
  const [restaurant, setRestaurant] = useState({}); 
  const [userID, setUserID] = useState("");
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

    // Lấy thông tin nhà hàng từ backend
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`/api/restaurant/getRestaurant/${restaurantId}`);
        const restaurant = response.data;
        // Đặt giá trị mặc định cho form
        setValue("name", restaurant.name);
        setValue("email", restaurant.email);
        setValue("location", restaurant.location);
        setValue("description", restaurant.description);
        setValue("categories", restaurant.categories._id);

        setValue("logo", restaurant.images.logo);
        setValue("poster", restaurant.images.poster);
        setValue("cover", restaurant.images.cover);
        setRestaurant(restaurant);
        // console.log(restaurant)
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchCategories();
    fetchRestaurant();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("data:",data)
      // Upload files to Cloudinary nếu cần thiết
      const logoUpload = data.logo===restaurant.images.logo ? data.logo : await uploadFileCloudinary(data.logo[0])
      const posterUpload = data.poster===restaurant.images.poster ? data.poster : await uploadFileCloudinary(data.poster[0])
      const coverUpload = data.cover===restaurant.images.cover ? data.cover : await uploadFileCloudinary(data.cover[0])

      const restaurantData = {
        name: data.name,
        email: data.email,
        location: data.location,
        description: data.description,
        categories: data.categories, 
        images: {
          logo: logoUpload,
          poster: posterUpload,
          cover: coverUpload,
        },
      };

      // Gửi dữ liệu đã chỉnh sửa đến backend
      const response = await axios.put(`/api/restaurant/edit/${restaurantId}`, restaurantData);
      if (response.status === 200) {
        showToast("success","Restaurant edited successfully","")
        console.log("Restaurant updated successfully:", response.data);
      }
    } catch (error) {
      showToast("error","Restaurant added failed","")
      console.error("Error updating restaurant:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Restaurant Edit</h4>
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
            Restaurant Edit
          </li>
        </ol>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Box className="grid grid-cols-3 gap-5">
          <div className=" items-center gap-10">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
            </div>
            <div>
              <input
                {...register("name", { required: "Name is required" })}
                type="text" placeholder="Your Restaurant Name" className="input input-bordered w-full"
              />
            </div>
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


        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
            rows="5"
            placeholder="Your Description's Restaurant"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categories</label>
          <div className="mt-2 grid grid-cols-5">
            {/* {categories.map((category) => console.log(category._id + " : " + restaurant.categories?.map(a => a._id).includes(category._id)))} */}
            {categories.map((category) => (
              
              <div key={category._id} className="flex items-center">
                <input
                  type="checkbox"
                  value={category._id}
                  // defaultChecked
                  checked={restaurant.categories?.map(a => a._id).includes(category._id)}
                  // defaultChecked={console.log(restaurant.categories?.map(a => a._id).includes(category._id))}
                  onClick={() => {
                    setRestaurant(prevState => {
                      // console.log("categories:",prevState.categories)
                      const updatedCategories = [...prevState.categories];
                      if (prevState.categories.map(a => a._id).includes(category._id)) {
                        updatedCategories.splice(updatedCategories.findIndex(a => a._id === category._id), 1);
                      } else {
                        updatedCategories.push(category);
                      }
                      // console.log("updated categories:",updatedCategories)
                      return {
                        ...prevState,
                        categories: updatedCategories
                      };
                    });
                  }}
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
          <Button colorScheme="green" type="submit">
            Update Restaurant
          </Button>
        </div>
      </form>
      <div />
    </div>
  );
};

export default RestaurantEdit;

