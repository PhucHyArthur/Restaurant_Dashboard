import React, { useState } from "react";
import { FaArrowRight, FaEye, FaEyeLowVision } from "react-icons/fa6";
import "./styles.scss";
import PersonalDetails from "./Components/personalDetails";
import { useForm } from "react-hook-form"
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";


const ProfileOwner = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log("user data:", data)
    try {
      const userData = {
        currentPassword : data.currentPassword,
        newPassword : data.newPassword,
      }
      const response = await axios.put('/api/user/editPassword', userData)

      if (response.status === 200) {
        console.log("message", response.data)
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const newPassword = watch("newPassword", "")
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)



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

      <Box className="max-w-[600px] mx-auto">
        <PersonalDetails />

        <div className="p-6 w-full h-fit border rounded-lg border-default-200 mb-6">
          <div>
            <Text className='text-2xl font-[500]'>Change Password</Text>
            <form
              className="flex flex-col gap-5 mt-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="relative">
                <div>Current Password</div>
                <input
                  className="input"
                  type={show1 ? "text" : "password"}
                  placeholder="Current Password"
                  {...register("currentPassword", { required: true })}
                />
                <div
                  onClick={() => setShow1(!show1)}
                  className="absolute top-4 right-3 border-[1px] translate-y-1/2 border-[#ccc] p-[6px] rounded-md hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer"
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
                <div>New Password</div>
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
                  className="absolute top-4 right-3 border-[1px] translate-y-1/2 border-[#ccc] p-[6px] rounded-md hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer"
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
                <div>Confirm New Password</div>
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
                <Button className='mt-5 float-right' px={5} border={'1px solid #ccc'} bg={'white'} _hover={{ border: '1px solid black' }} rounded={100} type='submit'>Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ProfileOwner;
