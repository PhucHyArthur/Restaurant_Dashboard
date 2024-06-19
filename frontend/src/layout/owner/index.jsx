import { Outlet } from "react-router-dom";
import DefaultHeader from "../components/header/default";
import NavOwner from "../../components/NavOwner";

const OwnerLayout = () => {
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
