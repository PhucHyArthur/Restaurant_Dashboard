import React, { useState } from "react";
import { FaArrowRight, FaEye, FaEyeLowVision } from "react-icons/fa6";
import "./styles.scss";
import { useForm } from "react-hook-form";

const ProfileOwner = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };

  const newPassword = watch("newPassword", "");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Setting</h4>
        <ol className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2">
          <li className="text-sm">
            <a className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500">
              Admin
              <FaArrowRight />
            </a>
          </li>
          <li
            aria-current="page"
            className="text-sm font-medium text-primary truncate leading-none hover:text-primary-500"
          >
            Setting
          </li>
        </ol>
      </div>
      <div className="p-6 border rounded-lg border-default-200 mb-6">
        <div>
          <h4 className="text-xl font-medium text-default-900 mb-4">
            Personal Details
          </h4>
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-1">
              <div className="w-60 h-60 relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/%E6%A9%8B%E6%9C%AC%E3%81%82%E3%82%8A%E3%81%AA1.jpg/330px-%E6%A9%8B%E6%9C%AC%E3%81%82%E3%82%8A%E3%81%AA1.jpg"
                  className="w-full h-full rounded-full"
                  alt="Avatar"
                />
                <div className="absolute bottom-2 right-4">
                  <button className="w-11 h-11 flex items-center justify-center rounded-full bg-primary border-2 border-default-50">
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
                      className="lucide lucide-camera w-5 h-5 text-white"
                    >
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                      <circle cx="12" cy="13" r="3"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium text-default-900 mb-2"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    className="block w-full bg-transparent rounded-full py-2.5 px-4 border border-default-200 focus:ring-transparent focus:border-default-200 dark:bg-default-50"
                    type="text"
                    placeholder="Enter Your Full Name"
                    {...register("fullName", { required: true })}
                  />
                  {errors.fullName && (
                    <div className="text-red-500 opacity-1 h-4">
                      Full Name is required
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-default-900 mb-2">
                    User Name
                  </label>
                  <input
                    id="userName"
                    className="block w-full bg-transparent rounded-full py-2.5 px-4 border border-default-200 focus:ring-transparent focus:border-default-200 dark:bg-default-50"
                    type="text"
                    placeholder="Enter Your User Name"
                    {...register("userName", { required: true })}
                  />
                  {errors.userName && (
                    <div className="text-red-500 opacity-1 h-4">
                      User Name is required
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-default-900 mb-2">
                    Email
                  </label>
                  <input
                    className="block w-full bg-transparent rounded-full py-2.5 px-4 border border-default-200 focus:ring-transparent focus:border-default-200 dark:bg-default-50"
                    type="email"
                    placeholder="demoexample@mail.com"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <div className="text-red-500 opacity-1 h-4">
                      Email is required
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-default-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    className="block w-full bg-transparent rounded-full py-2.5 px-4 border border-default-200 focus:ring-transparent focus:border-default-200 dark:bg-default-50"
                    type="tel"
                    placeholder="+84-123-XXX-4567"
                    {...register("phoneNumber", { required: true })}
                  />
                  {errors.phoneNumber && (
                    <div className="text-red-500 opacity-1 h-4">
                      Phone Number is required
                    </div>
                  )}
                </div>
                <div className="">
                  <button className="flex items-center justify-center gap-2 rounded-full border border-primary bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:border-primary-700 hover:bg-primary-500">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 border rounded-lg border-default-200 mb-6">
        <div>
          <h4 className="text-xl font-medium text-default-900 mb-4">
            Change Password
          </h4>
          <form
            className="flex flex-col gap-5 mt-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <div>Enter Your Current Password</div>
              <input
                className="input"
                type={show1 ? "text" : "password"}
                placeholder="Current Password"
                {...register("currentPassword", { required: true })}
              />
              <div
                onClick={() => setShow1(!show1)}
                className="absolute top-[45%] right-3 border-[1px] border-[#ccc] p-[6px] rounded-md hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer"
              >
                {show1 ? <FaEye /> : <FaEyeLowVision />}
              </div>
              {errors.currentPassword && (
                <div className="text-red-500 opacity-1 h-4">
                  Current Password is required
                </div>
              )}
            </div>

            <div className="relative">
              <div>Enter Your New Password</div>
              <input
                className="input"
                type={show2 ? "text" : "password"}
                placeholder="New Password"
                {...register("newPassword", {
                  required: true,
                  minLength: 8,
                  maxLength: 24,
                })}
              />
              <div
                onClick={() => setShow2(!show2)}
                className="absolute top-[45%] right-3 border-[1px] border-[#ccc] p-[6px] rounded-md hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer"
              >
                {show2 ? <FaEye /> : <FaEyeLowVision />}
              </div>
              {errors.newPassword && errors.newPassword.type === "required" && (
                <div className="text-red-500 opacity-1 h-4">
                  New Password is required
                </div>
              )}
              {errors.newPassword && errors.newPassword.type === "minLength" && (
                <div className="text-red-500 opacity-1 h-4">
                  Password must be at least 8 characters
                </div>
              )}
              {errors.newPassword && errors.newPassword.type === "maxLength" && (
                <div className="text-red-500 opacity-1 h-4">
                  Password must be no more than 24 characters
                </div>
              )}
            </div>

            <div>
              <div>Enter Your New Password Again</div>
              <input
                className="input"
                type={"password"}
                placeholder="Confirm New Password"
                {...register("confirmNewPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
              {errors.confirmNewPassword && (
                <div className="text-red-500 h-4">
                  {errors.confirmNewPassword.message}
                </div>
              )}
            </div>
            <div className="ml-auto">
            <button
              className="flex items-center justify-center gap-2 rounded-full border border-primary bg-primary px-6 py-2.5 text-center text-sm font-semibold text-white"
              type="submit"
            >
              Save Changes
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileOwner;
