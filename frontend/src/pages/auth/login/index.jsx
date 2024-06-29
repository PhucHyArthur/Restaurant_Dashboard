import { useForm } from "react-hook-form"
import { FaEye, FaEyeLowVision } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"

import './styles.scss'
import { UserContext } from "../../../context/UserContext"
import CustomToast from "../../../components/Toast"


const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const [show, setShow] = useState(false)
  const [userData, setUserData] = useContext(UserContext)
  const showToast = CustomToast()

  const onSubmit = async (data) => {
    // console.log(data)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      // console.log(response)
      if (response.ok) {
        showToast('success', 'Login successfully', '')
        setUserData({
          user : responseData.user
        })
        navigate('/owner/restaurant/list')
      } 
    } catch (error) {
      showToast('error', 'Login failed', '')
      console.error("Error:", error);
      // Handle any unexpected errors that may occur during the request
    }
  };


  return (
    <div className="h-full w-full ">
      <div className="w-full h-full px-5 ">
        <div className=" flex w-full h-full justify-center items-center">
          <div className="w-[500px] bg-white p-10 font-[500] rounded-md border-2 border-gray-400">
            <p className="text-[24px]">Đăng Nhập</p>

            <form className="flex flex-col gap-6 mt-10" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input className="input" type="email" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email && errors.email.type === "required" && <div className="text-red-500 opacity-1 h-4">Vui lòng không bỏ trống</div>}
                {errors.email && errors.email.type === "pattern" && <div className="text-red-500 opacity-1 h-4">Định dạng email không đúng</div>}
                {errors.email && errors.email.type === "manual" && <div className="text-red-500 opacity-1 h-4">{errors.email.message}</div>}
                {!errors.email && <div className="text-red-500 opacity-0 h-4"></div>}
              </div>

              <div className="relative">
                <input className="input" type={show ? 'text' : 'password'} placeholder="Password" {...register("password", { required: true, minLength: 8, maxLength: 24 })} />
                <div onClick={() => setShow(!show)}
                  className="absolute top-[10%] right-3 border-[1px] border-[#ccc] p-[6px] rounded-md hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer">
                  {show ? <FaEye /> : <FaEyeLowVision />}
                </div>
                {errors.password && errors.password.type === "required" && <div className="text-red-500 opacity-1 h-4">Vui lòng không bỏ trống</div>}
                {errors.password && errors.password.type === "minLength" && <div className="text-red-500 opacity-1 h-4">Mật khẩu có tối thiểu 8 ký tự</div>}
                {errors.password && errors.password.type === "maxLength" && <div className="text-red-500 opacity-1 h-4">Mật khẩu có tối đa 24 ký tự</div>}
                {!errors.password && <div className="text-red-500 opacity-0 h-4"></div>}
              </div>

              <button
                className="bg-[#fa5030] p-3 rounded-md text-white cursor-pointer"
                type="submit"
              >
                Đăng nhập
                {/* {isLoading ? 'Loading' : 'Đăng Nhập'} */}
              </button>
            </form>

            <div className="text-center mt-6">Bạn chưa có tài khoản ? <Link className="text-[#dc2626]" to={'/register'}>Đăng Ký</Link></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login