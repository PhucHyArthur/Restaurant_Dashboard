import { Outlet, useNavigate } from "react-router-dom";
import DefaultHeader from "../components/header/default";
import NavOwner from "../../components/NavOwner";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Box } from "@chakra-ui/react";
import FooterDefault from "../components/footer/default";

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
          <Box className="min-h-[95vh]">
            <Outlet />
          </Box>
          <FooterDefault />
        </Box>
      </Box>

    </div>
  );
};

export default OwnerLayout;
