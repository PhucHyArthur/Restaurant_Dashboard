import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const RestaurantAdminList = () => {
  const { register, handleSubmit, watch } = useForm();
  const watchAllFields = watch(); // Watch all fields to trigger re-render on input change
  const [restaurants, setRestaurants] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null); // State for confirming deletion

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("/api/restaurant/all");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (restaurantId) => {
    try {
      setConfirmDelete(restaurantId); // Display confirmation modal before deleting
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const confirmDeleteAction = async () => {
    try {
      const response = await axios.delete(
        `/api/restaurant/delete/${confirmDelete}`
      );
      console.log(response.data); // Log success message
      // Update restaurants state after successful deletion
      const updatedRestaurants = restaurants.filter(
        (restaurant) => restaurant._id !== confirmDelete
      );
      setRestaurants(updatedRestaurants);
      setConfirmDelete(null); // Clear confirm delete state after successful deletion
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const closeModal = () => {
    setConfirmDelete(null); // Close modal and reset state
  };

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
              src={restaurant.images.logo}
              className="h-20 w-20 mx-auto mb-4"
              alt="Restaurant"
            />
            <h4 className="text-base uppercase font-medium text-center text-default-900">
              {restaurant.name}
            </h4>
            <h4 className="text-base font-medium text-center text-default-600 mb-10">
              {restaurant.owner}
            </h4>

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
                    className="feather feather-map-pin w-5 h-5 text-default-800"
                  >
                    <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 1 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <p className="text-sm text-default-700">
                  {restaurant.location}
                </p>
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
                    className="feather feather-mail w-5 h-5 text-default-800"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <path d="M2 9l10 7 10-7" />
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
                    className="feather feather-phone w-5 h-5 text-default-800"
                  >
                    <path d="M23 1l-6 6a2 2 0 0 0 0 3l3 3a2 2 0 0 1 0 3l-6 6a2 2 0 0 1-3 0l-3-3a2 2 0 0 0-3 0l-6 6a2 2 0 0 0 0 3l3 3a2 2 0 0 1 0 3l-6 6"></path>
                  </svg>
                </div>
                <p className="text-sm text-default-700">{restaurant.phone}</p>
              </div>

              <div>
                <p>Owner:</p>
                <p className="text-sm text-default-700">
                  {restaurant.userId.name}
                </p>
              </div>
            </div>

            <div className="items-center justify-center flex">
              <button
                type="button"
                className="btn btn-outline hover:bg-red-500"
                onClick={() => handleDelete(restaurant._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg">
            <h4 className="text-lg font-medium mb-4">
              Are you sure you want to delete this restaurant?
            </h4>
            <div className="flex justify-end">
              <button className="btn btn-secondary mr-4" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={confirmDeleteAction}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantAdminList;
