import { Outlet, useNavigate } from "react-router-dom";
import DefaultHeader from "../components/header/default";
import NavOwner from "../../components/NavOwner";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

const OwnerLayout = () => {
  const [userData, setUserData] = useContext(UserContext) 
  const navigate = useNavigate()

  useEffect(() => {
    console.log("userData: ", userData);
    if (userData.user === "null" || !userData.user) {
      navigate('/')
    }
  }, [userData])
  return (
    <div className="bg-white">
      <DefaultHeader />

      <div className="flex">
        <NavOwner />

        <div className="w-[85vw] px-5 ml-[260px]">
          <Outlet />
          <div className="">The footer</div>
        </div>
      </div>

    </div>
  );
};

export default OwnerLayout;
