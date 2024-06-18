// RestaurantList.js
import { useForm } from "react-hook-form";
import { restaurants } from "./mockData"; // Import mock data

const RestaurantList = () => {
  const { register, handleSubmit, watch } = useForm();
  const watchAllFields = watch(); // Watch all fields to trigger re-render on input change

  const filteredRestaurants = restaurants.filter((restaurant) => {
    return (
      (!watchAllFields.name ||
        restaurant.name
          .toLowerCase()
          .includes(watchAllFields.name.toLowerCase())) &&
      (!watchAllFields.owner ||
        restaurant.owner
          .toLowerCase()
          .includes(watchAllFields.owner.toLowerCase()))
    );
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Restaurant List</h4>
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
            Restaurant List
          </li>
        </ol>
      </div>

      <form className="mb-6">
        <div className="mb-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              id="name"
              {...register("name")}
              className="grow"
              placeholder="Find Restaurant"
            />
          </label>
        </div>
      </form>

      <div className="grid 2xl:grid-cols-4 md:grid-cols-2 gap-6 mb-6">
        {filteredRestaurants.map((restaurant, index) => (
          <div
            key={index}
            className="relative p-6 rounded-lg border border-default-200"
          >
            <img
              src="/yum/assets/1-1bb67308.png"
              className="h-14 w-14 mx-auto mb-4"
              alt="Restaurant"
            />
            <h4 className="text-base uppercase font-medium text-center text-default-900">
              {restaurant.name}
            </h4>
            <h4 className="text-base font-medium text-center text-default-600 mb-10">
              {restaurant.owner}
            </h4>

            <div className="flex justify-around mb-8">
              <div className="text-center">
                <h4 className="text-lg font-medium text-primary mb-2.5">
                  {restaurant.totalProducts}
                </h4>
                <h5 className="text-sm text-default-800">Total Product</h5>
              </div>
              <div className="border-s border-default-200"></div>
              <div className="text-center">
                <h4 className="text-lg font-medium text-primary mb-2.5">
                  {restaurant.totalSales}
                </h4>
                <h5 className="text-sm text-default-800">Total Sales</h5>
              </div>
            </div>

            <div className="space-y-5 mb-6">
              <div className="flex gap-3">
                <div className="flex-shrink">
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
                    className="lucide lucide-map-pin w-5 h-5 text-default-800"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <p className="text-sm text-default-700">{restaurant.address}</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink">
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
                    className="lucide lucide-mail w-5 h-5 text-default-800"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <p className="text-sm text-default-700">{restaurant.email}</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink">
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
                    className="lucide lucide-phone w-5 h-5 text-default-800"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <p className="text-sm text-default-700">{restaurant.phone}</p>
              </div>
            </div>
            <div className="items-center justify-center flex">
              <button
                type="button"
                className="btn btn-outline hover:bg-green-500"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;

// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import * as jwt_decode from "jwt-decode";
// import cookie from "cookie";

// const RestaurantList = () => {
//   const { register, handleSubmit, watch } = useForm();
//   const watchAllFields = watch(); // Watch all fields to trigger re-render on input change
//   const [restaurants, setRestaurants] = useState([]);
//   const [userID, setUserID] = useState("");

//   useEffect(() => {
//     // Lấy token từ cookie
//     const cookies = cookie.parse(document.cookie);
//     const token = cookies.jwt; // Assumed the token name is `jwt`
//     if (token) {
//       const decoded = jwt_decode(token);
//       setUserID(decoded.userId); // Giả sử userId nằm trong payload của token
//     }

//     const fetchRestaurants = async () => {
//       try {
//         const response = await axios.get("/api/restaurant", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setRestaurants(response.data);
//       } catch (error) {
//         console.error("Error fetching restaurants:", error);
//       }
//     };

//     if (userID) {
//       fetchRestaurants();
//     }
//   }, [userID]);

//   const filteredRestaurants = restaurants.filter((restaurant) => {
//     return (
//       (!watchAllFields.name ||
//         restaurant.name
//           .toLowerCase()
//           .includes(watchAllFields.name.toLowerCase())) &&
//       (!watchAllFields.owner ||
//         restaurant.owner
//           .toLowerCase()
//           .includes(watchAllFields.owner.toLowerCase()))
//     );
//   });

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between w-full mb-6">
//         <h4 className="text-xl font-medium">Restaurant List</h4>
//         <ol className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2">
//           <li className="text-sm">
//             <a className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500">
//               Restaurant
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="lucide lucide-chevron-right w-4 h-4"
//               >
//                 <path d="m9 18 6-6-6-6"></path>
//               </svg>
//             </a>
//           </li>
//           <li
//             aria-current="page"
//             className="text-sm font-medium text-primary truncate leading-none hover:text-primary-500"
//           >
//             Restaurant List
//           </li>
//         </ol>
//       </div>

//       <form className="mb-6">
//         <div className="mb-4">
//           <label className="input input-bordered flex items-center gap-2">
//             <input
//               id="name"
//               {...register("name")}
//               className="grow"
//               placeholder="Find Restaurant"
//             />
//           </label>
//         </div>
//       </form>

//       <div className="grid 2xl:grid-cols-4 md:grid-cols-2 gap-6 mb-6">
//         {filteredRestaurants.map((restaurant, index) => (
//           <div
//             key={index}
//             className="relative p-6 rounded-lg border border-default-200"
//           >
//             <img
//               src={restaurant.images.logo} // Replace with the appropriate field from your backend
//               className="h-14 w-14 mx-auto mb-4"
//               alt="Restaurant"
//             />
//             <h4 className="text-base uppercase font-medium text-center text-default-900">
//               {restaurant.name}
//             </h4>
//             <h4 className="text-base font-medium text-center text-default-600 mb-10">
//               {restaurant.owner} {/* Adjust this field according to your data */}
//             </h4>

//             <div className="flex justify-around mb-8">
//               <div className="text-center">
//                 <h4 className="text-lg font-medium text-primary mb-2.5">
//                   {restaurant.totalProducts} {/* Adjust this field according to your data */}
//                 </h4>
//                 <h5 className="text-sm text-default-800">Total Product</h5>
//               </div>
//               <div className="border-s border-default-200"></div>
//               <div className="text-center">
//                 <h4 className="text-lg font-medium text-primary mb-2.5">
//                   {restaurant.totalSales} {/* Adjust this field according to your data */}
//                 </h4>
//                 <h5 className="text-sm text-default-800">Total Sales</h5>
//               </div>
//             </div>

//             <div className="space-y-5 mb-6">
//               <div className="flex gap-3">
//                 <div className="flex-shrink">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-map-pin w-5 h-5 text-default-800"
//                   >
//                     <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
//                     <circle cx="12" cy="10" r="3"></circle>
//                   </svg>
//                 </div>
//                 <p className="text-sm text-default-700">{restaurant.address}</p> {/* Adjust this field according to your data */}
//               </div>

//               <div className="flex gap-3">
//                 <div className="flex-shrink">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-mail w-5 h-5 text-default-800"
//                   >
//                     <rect width="20" height="16" x="2" y="4" rx="2"></rect>
//                     <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
//                   </svg>
//                 </div>
//                 <p className="text-sm text-default-700">{restaurant.email}</p> {/* Adjust this field according to your data */}
//               </div>

//               <div className="flex gap-3">
//                 <div className="flex-shrink">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-phone w-5 h-5 text-default-800"
//                   >
//                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//                   </svg>
//                 </div>
//                 <p className="text-sm text-default-700">{restaurant.phone}</p> {/* Adjust this field according to your data */}
//               </div>
//             </div>
//             <div className="items-center justify-center flex">
//               <button
//                 type="button"
//                 className="btn btn-outline hover:bg-green-500"
//               >
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RestaurantList;
