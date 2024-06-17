import React from "react";
import BarLineChart from "../../components/ChartPage/BarLineChart";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const RestaurantDetail = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Restaurant Detail</h4>
        <ol className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2">
          <li className="text-sm">
            <a href="#" className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500">
              Restaurant
              <FaArrowRight />
            </a>
          </li>
          <li
            aria-current="page"
            className="text-sm font-medium text-primary truncate leading-none hover:text-primary-500"
          >
            Restaurant Detail
          </li>
        </ol>
      </div>

      <div className="p-6 rounded-lg border border-default-200 mb-6">
        <img
          src="https://www.shutterstock.com/image-vector/kfc-icon-logo-sign-red-260nw-2395215867.jpg"
          alt="Restaurant"
          className="w-full h-[100px] object-cover"
        />

        <div className="flex md:items-end items-center gap-3 md:-mt-14">
          <img
            src="https://seeklogo.com/images/K/kfc-logo-A232F2E6D1-seeklogo.com.png"
            alt="Logo"
            className="w-28 h-28 bg-default-50 rounded-full"
          />
          <div>
            <h4 className="text-base font-medium text-default-800 mb-1">
              Healthy Feast Corner
            </h4>
            <p className="text-sm text-default-600">Since 2013</p>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 grid-cols-1 gap-6">
        <div className="xl:col-span-2">
          <div className="p-6 rounded-lg border border-default-200 mb-6 gap-3">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                Last 7 days
                <FaArrowDown className="icon-cog" style={{ color: 'gray' }} />
              </div>  
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="#">Last Month</a>
                </li>
                <li>
                  <a href="#">Last Year</a>
                </li>
              </ul>
            </div>
            <div>
              <BarLineChart />
            </div>
          </div>
        </div>

        <div className="xl:col-span-1">
          <div className="p-6 rounded-lg border border-default-200 mb-6">
            <div className="font-bold text-xl text-center border-b border-default-200 pb-2 mb-4">
              OWNER PERSONAL DETAIL
            </div>
            <div className="px-6 py-5">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="text-start text-base font-medium">Owner Name:</td>
                    <td className="text-start">Kianna Vetrovs</td>
                  </tr>
                  <tr>
                    <td className="text-start text-base font-medium">Email:</td>
                    <td className="text-start">kianna.vetrov@mail.com</td>
                  </tr>
                  <tr>
                    <td className="text-start text-base font-medium">Contact No:</td>
                    <td className="text-start">+(123) 456 7890</td>
                  </tr>
                  <tr>
                    <td className="text-start text-base font-medium">Location:</td>
                    <td className="text-start">Canada</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
