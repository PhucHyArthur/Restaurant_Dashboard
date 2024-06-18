import { FaGripVertical } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const NavOwner = () => {
  const navigate = useNavigate();
  const redirectPage = (page) => {
    navigate(page);
  };
  return (
    <div className="relative h-full w-full bg-gray-500">
      <div className="flex flex-col gap-1 w-full max-h-[400px] overflow-y-auto">
        <div className="flex w-full items-center gap-3">
          <button className="btn w-full text-base justify-start">
            <FaGripVertical />
            <div onClick={() => redirectPage("/owner")}>Dashboard</div>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn w-full text-base justify-start">
            <FaGripVertical />
            <Link to={"/owner/manage"}>Manage</Link>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-base font-medium flex items-center gap-3">
              <FaGripVertical />
              <p>Orders</p>
            </div>
            <div className="collapse-content flex flex-col gap-2">
              <Link to={"/owner/order/list"}>Order Lists</Link>
              <Link to={"/owner/order/detail"}>Order Details</Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-base  font-medium flex items-center gap-3">
              <FaGripVertical />
              <p>Customers</p>
            </div>
            <div className="collapse-content flex flex-col gap-2">
              <Link to={"/owner/customer/list"}>Customer Lists</Link>
              <Link to={"/owner/customer/detail"}>Customer Details</Link>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-arrow collapse-title text-base  font-medium flex items-center gap-3">
              <FaGripVertical />
              <p>Restaurant</p>
            </div>
            <div className="collapse-content flex flex-col gap-2">
              <Link to={"/owner/restaurant/list"}>Restaurant Lists</Link>
              <Link to={"/owner/restaurant/detail"}>Restaurant Details</Link>
              <Link to={"/owner/restaurant/add"}>Restaurant Add</Link>
              <Link to={"/owner/restaurant/edit"}>Restaurant Edit</Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-base  font-medium flex items-center gap-3">
              <FaGripVertical />
              <p>Product</p>
            </div>
            <div className="collapse-content flex flex-col gap-2">
              <Link to={"/owner/product/list"}>Product Lists</Link>
              <Link to={"/owner/product/add"}>Product Add</Link>
            </div>
          </div>
        </div>
      </div>

      <div className=" absolute w-full bottom-[20%] translate-y-1/2">
          <button className=" flex items-center w-full gap-2 p-2 mb-1 border-[1px] border-gray-400 rounded-md">
            <FaGripVertical />
            <div>Setting</div>
          </button>
          <button className="flex items-center w-full gap-2 p-2 border-[1px] border-gray-400 rounded-md">
            <FaGripVertical />
            <div>Logout</div> 
          </button>
      </div>
    </div>
  );
};

export default NavOwner;
