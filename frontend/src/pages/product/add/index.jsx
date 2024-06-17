// import React from "react";

// const ProductAdd = () => {
//   return (
//     <div className="grid lg:grid-cols-3 gap-6">
//       <div className="p-6 rounded-lg border">
//         <div className="h-96 p-6 flex flex-col items-center justify-center rounded-lg border mb-4">
//           <h5 className="text-base text-primary font-medium mb-2">
//             Upload Image
//           </h5>
//           <p className="text-sm text-default-600 mb-2">
//             Upload a cover image for your product.
//           </p>
//           <p className="text-sm text-default-600">
//             File Format
//             <span className="text-default-800"> jpeg, png </span>
//             Recommended Size
//             <span className="text-default-800"> 600x600 (1:1) </span>
//           </p>
//         </div>
//       </div>

//       <div className="lg:col-span-2">
//         <div className="p-6 rounded-lg border">
//           <div className="grid lg:grid-cols-2 gap-6 mb-6">
//             <div className="space-y-6">
//               <div>
//                 <input
//                   className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
//                   type="text"
//                   placeholder="Product Name"
//                 />
//               </div>

//               <div>
//                 <select className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent">
//                   <option>Select Product Category</option>
//                   <option value="italian">Italian</option>
//                   <option value="bbq">BBQ</option>
//                   <option value="mexican">Mexican</option>
//                 </select>
//               </div>

//               <div>
//                 <select className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent">
//                   <option>Select Restaurant</option>
//                   <option value="italian">Italian</option>
//                   <option value="bbq">BBQ</option>
//                   <option value="mexican">Mexican</option>
//                 </select>
//               </div>

//               <div>
//                 <input
//                   className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
//                   type="text"
//                   placeholder="Selling Price"
//                 />
//               </div>

//               <div>
//                 <textarea
//                   className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
//                   rows="5"
//                   placeholder="Ingredient"
//                 ></textarea>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <div>
//                 <textarea
//                   className="block w-full bg-transparent rounded-lg py-2.5 px-4 border focus:ring-transparent"
//                   rows="5"
//                   placeholder="Description"
//                 ></textarea>
//               </div>

//               <div className="flex justify-end gap-4">
//                 <button className="py-2.5 px-4 rounded-lg text-sm font-medium bg-primary text-white">
//                   Save
//                 </button>
//                 <button className="py-2.5 px-4 rounded-lg text-sm font-medium bg-primary text-white">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductAdd;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import uploadFileCloudinary from "../../actions/UploadFileCloudinary";
import axios from "axios";
import Form from "../../components/Form";

const ProductAdd = () => {
  const {
    register,
    handleSubmit,
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
  },[])

  const onSubmit = async (data) => {
    // Handle form submission, e.g., sending data to the backend
    try {
      const imageUpload = data.image[0] ? await uploadFileCloudinary(data.image[0]) : ''
      const productData = {
        name: data.name,
        categories: data.categories,
        price: data.price,
        restaurantId : data.restaurantId,
        ingredients: data.ingredients,
        description: data.description,
        image: imageUpload
      }

      const response = await axios.post('/api/food/add', productData) 
      console.log("Food added successfully",response.data);
    } catch (error) {
      console.error("Error adding food: ", error)
    }
  };


  return (
    <Form handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} restaurants={restaurants} categories={categories}/>
  );
};

export default ProductAdd;
