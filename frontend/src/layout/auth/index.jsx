import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const AuthLayout = () => {
  const [userData, setUserData] = useContext(UserContext) 
  const navigate = useNavigate()

  useEffect(() => {
    if (userData.user !== "null" || userData.user) {
      if (JSON.parse(userData.user)?.role === "owner") {
        navigate('/owner')
      }
      // admin redirect
    }
  },[])
  return (
    <div>
      <div className="flex min-h-[600px] h-full w-full">
        <div className="w-[100%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
