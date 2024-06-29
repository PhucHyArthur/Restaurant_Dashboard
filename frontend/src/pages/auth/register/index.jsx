import { useForm } from "react-hook-form";
import { FaEye, FaEyeLowVision } from "react-icons/fa6";

import "./styles.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomToast from "../../../components/Toast";

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const showToast = CustomToast()

  const password = watch("password", "");
  const [show, setShow] = useState(false);

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        showToast('success', 'User registered successfully', '')
        console.log(responseData.message); // User registered successfully
        // You can perform any additional actions here after successful registration
        navigate("/")
      }
    } catch (error) {
      showToast('error', 'User registration failed', '')
      console.error("Error:", error);
      // Handle any unexpected errors that may occur during the request
    }
  };

  return (
    <div className="h-full w-full ">
      <div className="w-full h-full px-5 ">
        <div className=" flex w-full h-full justify-center items-center">
          <div className="w-[500px] rounded-md bg-white p-10 font-[500] border-gray-400 border-2">
            <p className="text-[24px]">Đăng Ký</p>

            <form
              className="flex flex-col gap-5 mt-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <div className="text-red-500 opacity-1 h-4">
                    Vui lòng không bỏ trống
                  </div>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <div className="text-red-500 opacity-1 h-4">
                    Định dạng email không đúng
                  </div>
                )}
                {errors.email && errors.email.type === "manual" && (
                  <div className="text-red-500 opacity-1 h-4">
                    {errors.email.message}
                  </div>
                )}
                {!errors.email && (
                  <div className="text-red-500 opacity-0 h-4"></div>
                )}
              </div>

              <div className="relative">
                <input
                  className="input"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 24,
                  })}
                />
                <div
                  onClick={() => setShow(!show)}
                  className="absolute top-[10%] right-3 border-[1px] border-[#ccc] p-[6px] rounded-md hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer"
                >
                  {show ? <FaEye /> : <FaEyeLowVision />}
                </div>
                {errors.password && errors.password.type === "required" && (
                  <div className="text-red-500 opacity-1 h-4">
                    Vui lòng không bỏ trống
                  </div>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <div className="text-red-500 opacity-1 h-4">
                    Mật khẩu có tối thiểu 8 ký tự
                  </div>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                  <div className="text-red-500 opacity-1 h-4">
                    Mật khẩu có tối đa 24 ký tự
                  </div>
                )}
                {!errors.password && (
                  <div className="text-red-500 opacity-0 h-4"></div>
                )}
              </div>

              <div className="">
                <input
                  className="input"
                  type={"password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Vui lòng không bỏ trống",
                    validate: (value) =>
                      value === password || "Mật khẩu không trùng khớp",
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 h-4">
                    {errors.confirmPassword.message}
                  </div>
                )}
                {!errors.confirmPassword && (
                  <div className="text-red-500 opacity-0 h-4"></div>
                )}
              </div>

              <button
                className="bg-[#fa5030] p-3 rounded-md text-white cursor-pointer"
                type="submit"
              >
                Đăng ký
              </button>
            </form>

            <div className="text-center mt-6">
              Bạn đã có tài khoản ?
              <Link className="text-[#fa5030]" to={"/"}>
                <p className="inline-block ml-1">Đăng Nhập</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
