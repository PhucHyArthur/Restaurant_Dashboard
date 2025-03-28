import { Outlet } from "react-router-dom";
import NavAdmin from "../../components/NavAdmin";
import DefaultHeader from "../components/header/default";

const AdminLayout = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 h-[100px] w-full bg-gray-700 z-10">
        <DefaultHeader />
      </div>

      <div className="flex mt-[100px]">
        <div className="fixed max-w-[200px] h-[100vh] overflow-hidden bg-gray-300">
          <NavAdmin />
        </div>
        <div className="w-[100%] ml-[200px]">
          <Outlet />
        </div>
      </div>

      <div className="ml-[200px]">The footer</div>
    </div>
  );
};

export default AdminLayout;
