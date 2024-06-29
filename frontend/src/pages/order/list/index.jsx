import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import mockOrders from "./mockData";
import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { LuDownload, LuMoveDown } from "react-icons/lu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const navigate = useNavigate()

  const orderStatus = ["PENDING", "CONFIRMED", "CANCELLED", "DELIVERED"];
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [statusSortOrder, setStatusSortOrder] = useState(0); 
  const [count, setCount] = useState({})
  const [orders, setOrders] = useState([])
  const [viewOrders, setViewOrders] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState("All");
  const [restaurants, setRestaurants] = useState([]);

  const handleSort = (column) => {
    if (column === "status") {
      setStatusSortOrder((prevOrder) => (prevOrder + 1) % 5);
    } else {
      const direction = sortedColumn === column && sortDirection === "asc" ? "desc" : "asc";
      setSortedColumn(column);
      setSortDirection(direction);
    }
  };

  const sortedOrders = [...viewOrders].sort((a, b) => {
    if (sortedColumn && sortedColumn !== "status") {
      if (a[sortedColumn] < b[sortedColumn]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[sortedColumn] > b[sortedColumn]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    } else if (statusSortOrder > 0 && statusSortOrder <= 4) {
      const statusPriority = orderStatus[statusSortOrder - 1];
      if (a.status === statusPriority && b.status !== statusPriority) return -1;
      if (a.status !== statusPriority && b.status === statusPriority) return 1;
      return 0;
    }
    return 0
  })

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axios.get("/api/restaurant/");
      if (response.status === 200) {
        setRestaurants(response.data)
        // console.log(response.data);
      }
    }
    
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get("/api/order/getAllOrders") 
        if (response.status === 200) {
          // console.log("All orders: ", response.data)
          setOrders(response.data)
          setViewOrders(response.data)
        }
      } catch (error) {
        console.error("Error fetching all orders: ", error)
      }
    } 
    const fetchCount = async () => {
      try {
        const response = await axios.get("/api/order/getOrdersCount")
        if (response.status === 200) {
          setCount(response.data)
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    }
    fetchRestaurants()
    fetchCount()
    fetchAllOrders()
  }, [])
  
  const onSelectRestaurant = (restaurantId) => {
    setSelectedRestaurant(restaurantId);
  };

  useEffect(() => {
    if (selectedRestaurant==="All") {
      setViewOrders(orders) 
    } else {
      const filteredOrders = orders.filter(order => order.restaurantId._id === selectedRestaurant)
      setViewOrders(filteredOrders)
    }
  }, [selectedRestaurant])


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
                      Orders Delivered
                    </p>
                    <h4 className="text-2xl text-default-950 font-semibold mb-2">
                      {count.confirmed + count.delivered}
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
                      {Intl.NumberFormat().format(count.revenue)} ₫ 
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
                      Select Restaurant
                    </MenuButton>
                    <MenuList>
                      <MenuItem key={""} onClick={() => onSelectRestaurant("All")}>
                        <a>
                          All
                        </a>
                      </MenuItem>
                      {restaurants.map((restaurant) => (
                        <MenuItem key={restaurant._id} onClick={() => onSelectRestaurant(restaurant._id)}>
                          <a>
                            {restaurant.name}
                          </a>
                        </MenuItem>
                      ))}
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
                            onClick={() => handleSort("restaurantName")}
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
                              {order.restaurantId.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              {Intl.NumberFormat().format(order.total)} ₫ 
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
                              <button className="btn" onClick={() => navigate(`/owner/order/detail/${order._id}`)}>View Details</button>
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
