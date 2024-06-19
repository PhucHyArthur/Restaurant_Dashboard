import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const CustomerAdminList = () => {
  const { register, handleSubmit, watch } = useForm();
  const watchAllFields = watch(); // Watch all fields to trigger re-render on input change
  const [customers, setCustomers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null); // State to manage confirmation modal

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/user/all");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((user) => {
    return (
      (!watchAllFields.name ||
        user.name.toLowerCase().includes(watchAllFields.name.toLowerCase())) &&
      (!watchAllFields.email ||
        user.email.toLowerCase().includes(watchAllFields.email.toLowerCase()))
    );
  });

  const handleDelete = async (userId) => {
    try {
      // Display confirmation modal before deleting
      setConfirmDelete(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const confirmDeleteAction = async () => {
    try {
      const response = await axios.delete(`/api/user/delete/${confirmDelete}`);
      console.log(response.data); // Log success message
      // Re-fetch customers after successful deletion
      const updatedCustomers = customers.filter(
        (user) => user._id !== confirmDelete
      );
      setCustomers(updatedCustomers);
      setConfirmDelete(null); // Clear confirm delete state after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const closeModal = () => {
    setConfirmDelete(null); // Close modal and reset state
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Customer List</h4>
      </div>

      <form className="mb-6">
        <div className="mb-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              id="name"
              {...register("name")}
              className="grow"
              placeholder="Find Customer"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              id="email"
              {...register("email")}
              className="grow"
              placeholder="Find Customer by Email"
            />
          </label>
        </div>
      </form>

      <div className="grid 2xl:grid-cols-4 md:grid-cols-2 gap-6 mb-6">
        {filteredCustomers.map((user, index) => (
          <div
            key={index}
            className="relative p-6 rounded-lg border border-default-200"
          >
            <h4 className="text-base uppercase font-medium text-center text-default-900">
              {user.name}
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
                    className="lucide lucide-map-pin w-5 h-5 text-default-800"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <p className="text-sm text-default-700">{user.address}</p>
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
                <p className="text-sm text-default-700">{user.email}</p>
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
                <p className="text-sm text-default-700">{user.phone}</p>
              </div>
              <div>
                <p> Role: {user.role}</p>
              </div>
            </div>
            <div className="items-center justify-center flex">
              <button
                type="button"
                className="btn btn-outline hover:bg-red-500"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <p className="text-lg font-medium mb-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end">
              <button className="btn btn-outline mr-4" onClick={closeModal}>
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

export default CustomerAdminList;
