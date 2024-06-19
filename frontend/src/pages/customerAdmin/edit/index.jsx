import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const CustomerAdminEdit = () => {
  const { register, handleSubmit, watch, setValue, reset } = useForm();
  const watchAllFields = watch(); // Watch all fields to trigger re-render on input change
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State to manage selected customer for edit
  const [confirmDelete, setConfirmDelete] = useState(null); // State to manage confirmation modal
  const [successMessage, setSuccessMessage] = useState(""); // State to manage success message

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
    const nameMatch =
      !watchAllFields.name ||
      (user.name &&
        user.name.toLowerCase().includes(watchAllFields.name.toLowerCase()));
    const emailMatch =
      !watchAllFields.email ||
      (user.email &&
        user.email.toLowerCase().includes(watchAllFields.email.toLowerCase()));

    return nameMatch && emailMatch;
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

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer); // Set selected customer for edit
    // Populate form fields with selected customer data
    setValue("name", customer.name);
    setValue("email", customer.email);
    setValue("role", customer.role);
    setValue("phone", customer.phone);
    setValue("address", customer.address);
    setSuccessMessage(""); // Clear success message when selecting a new customer
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `/api/user/edit/${selectedCustomer._id}`,
        data
      );
      console.log(response.data); // Log success message
      // Update local state with edited customer data
      const updatedCustomers = customers.map((customer) =>
        customer._id === selectedCustomer._id ? response.data.user : customer
      );
      setCustomers(updatedCustomers);
      setSuccessMessage("Save successful!"); // Set success message
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleBack = () => {
    setSelectedCustomer(null); // Clear selected customer to go back to list
    reset(); // Reset form fields
  };

  return (
    <div className="flex p-6">
      {/* Left section - Customer List */}
      <div className="w-1/3 pr-6">
        <h4 className="text-xl font-medium mb-6">Customer List</h4>

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

        <div className="grid gap-4">
          {filteredCustomers.map((customer) => (
            <div
              key={customer._id}
              className="cursor-pointer p-4 rounded-lg border border-gray-300 hover:bg-gray-100"
              onClick={() => handleCustomerSelect(customer)}
            >
              <h4 className="text-base uppercase font-medium text-center text-gray-900">
                {customer.name}
              </h4>
              <p className="text-sm text-gray-600">{customer.email}</p>
              <div className="flex justify-center mt-2">
                <button
                  type="button"
                  className="btn btn-outline hover:bg-red-500"
                  onClick={() => handleDelete(customer._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right section - Edit Form */}
      <div className="w-2/3 pl-6">
        {selectedCustomer ? (
          <>
            <div className="flex items-center mb-4">
              <button className="btn btn-outline mr-4" onClick={handleBack}>
                Back
              </button>
              <h2 className="text-xl font-medium">Edit Customer</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={selectedCustomer.name}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={selectedCustomer.email}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <input
                  {...register("role")}
                  type="text"
                  id="role"
                  name="role"
                  defaultValue={selectedCustomer.role}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter role"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  {...register("phone")}
                  type="text"
                  id="phone"
                  name="phone"
                  defaultValue={selectedCustomer.phone}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={selectedCustomer.address}
                  className="input input-bordered w-full mt-1"
                  placeholder="Enter address"
                />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>

            {successMessage && (
              <div className="mt-4 text-green-500 text-sm">
                {successMessage}
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-600">
            Select a customer to edit
          </div>
        )}
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

export default CustomerAdminEdit;
