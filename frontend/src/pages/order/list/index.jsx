import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import mockOrders from "./mockData";
import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { LuDownload, LuMoveDown } from "react-icons/lu";

const OrderList = () => {
  const [sortedColumn, setSortedColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (column) => {
    const direction = sortedColumn === column && sortDirection === "asc" ? "desc" : "asc"
    setSortedColumn(column)
    setSortDirection(direction)
  }

  console.log('check mockOrders:', mockOrders)

  const sortedOrders = [...mockOrders].sort((a, b) => {
    if (a[sortedColumn] < b[sortedColumn]) {
      return sortDirection === "asc" ? -1 : 1
    }
    if (a[sortedColumn] > b[sortedColumn]) {
      return sortDirection === "asc" ? 1 : -1
    }
    return 0
  })

  const totalOrders = mockOrders.length
  const totalBalance = mockOrders.reduce((acc, order) => acc + order.total, 0)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Order List</h4>
        <ol className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2">
          <li className="text-sm">
            <a className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500">
              Home
              <FaArrowRight />
            </a>
          </li>
          <li
            aria-current="page"
            className="text-sm font-medium text-primary truncate leading-none hover:text-primary-500"
          >
            Order List
          </li>
        </ol>
      </div>
      <div className="grid xl:grid-cols-12 gap-6 w-full overflow-hidden">
        <div className="xl:col-span-12 w-full">
          <div className="space-y-6 w-full">
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 overflow-hidden border-default-200 w-full">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/20 text-primary h-16 w-16"></div>
                  <div className="">
                    <p className="text-base text-default-500 font-medium mb-1">
                      Food Delivered
                    </p>
                    <h4 className="text-2xl text-default-950 font-semibold mb-2">
                      {totalOrders}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-6 overflow-hidden border-default-200 w-full">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center rounded-full bg-yellow-500/20 text-yellow-500 h-16 w-16"></div>
                  <div>
                    <p className="text-base text-default-500 font-medium mb-1">
                      Your Balance
                    </p>
                    <h4 className="text-2xl text-default-950 font-semibold mb-2">
                      ${totalBalance.toFixed(2)}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-6 overflow-hidden border-default-200 w-full">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center rounded-full bg-green-500/20 text-green-500 h-16 w-16"></div>
                  <div className="">
                    <p className="text-base text-default-500 font-medium mb-1">
                      Satisfaction Rating
                    </p>
                    <h4 className="text-2xl text-default-950 font-semibold mb-2">
                      98%
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 overflow-x-auto">
              <div className="border rounded-lg border-default-200 ">
                <div className="p-6">
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                    <h2 className="text-xl text-default-800 font-semibold">
                      Order History
                    </h2>
                    <label className="input input-bordered flex items-center gap-2 w-1/2">
                      <input
                        type="text"
                        className="grow w-1/2"
                        placeholder="Search"
                      />
                    </label>

                    <Menu>
                      <MenuButton as={Button} rightIcon={<LuMoveDown />}>
                        Sort by
                      </MenuButton>
                      <MenuList minWidth={'120px'}>
                        <MenuItem px={5}>Restaurant</MenuItem>
                        <MenuItem px={5}>Default</MenuItem>
                      </MenuList>
                    </Menu>

                  </div>
                </div>

                <div className="relative">
                  <div className="min-w-full inline-block align-middle">
                    <table className="min-w-full divide-y divide-default-200 w-[1000px]">
                      <thead className="bg-default-100">
                        <tr className="text-start">
                          <th
                            className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 cursor-pointer"
                            onClick={() => handleSort("createdAt")}
                          >
                            Date
                          </th>
                          <th
                            className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 cursor-pointer"
                            onClick={() => handleSort("_id")}
                          >
                            Order ID
                          </th>
                          <th
                            className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 cursor-pointer"
                            onClick={() => handleSort("username")}
                          >
                            Customer's Name
                          </th>
                          <th
                            className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 cursor-pointer"
                            onClick={() => handleSort("restaurantId")}
                          >
                            Restaurant Name
                          </th>
                          <th
                            className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 cursor-pointer"
                            onClick={() => handleSort("total")}
                          >
                            Amount
                          </th>
                          <th
                            className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 cursor-pointer"
                            onClick={() => handleSort("status")}
                          >
                            Status
                          </th>
                          <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 min-w-[10rem]">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-default-200">
                        {sortedOrders.map((order) => (
                          <tr key={order._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              {order._id.toString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              {order.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-800">
                              {order.restaurantId.toString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1 py-1 px-4 rounded-full text-sm font-medium ${order.status === "PENDING"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : order.status === "CONFIRMED"
                                    ? "bg-green-500/20 text-green-500"
                                    : order.status === "CANCELLED"
                                      ? "bg-red-500/20 text-red-500"
                                      : "bg-blue-500/20 text-blue-500"
                                  }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button className="btn">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
