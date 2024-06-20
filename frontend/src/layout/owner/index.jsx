import { Outlet, useNavigate } from "react-router-dom";
import DefaultHeader from "../components/header/default";
import NavOwner from "../../components/NavOwner";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Box } from "@chakra-ui/react";

const OwnerLayout = () => {
  const [userData, setUserData] = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    // console.log("userData: ", userData);
    if (userData.user === "null" || !userData.user) {
      navigate('/')
    }
  }, [userData])

  return (
    <div className="bg-white">
      <DefaultHeader />

      <Box>
        <NavOwner />

        <Box className="pl-[260px]">
          <Outlet />
          <div className="">The footer</div>
        </Box>
      </Box>

    </div>
  );
};

export default OwnerLayout;
