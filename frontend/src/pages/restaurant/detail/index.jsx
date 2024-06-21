import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import ProductList from "../../product/list";
import BarLineChart from "../../components/Chart/chart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Center, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { LuArrowDown } from "react-icons/lu";

const RestaurantDetail = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `/api/restaurant/getRestaurant/${restaurantId}`
        );

        if (response.status === 200) {
          console.log(response.data);
          setRestaurant(response.data);
        }
      } catch (error) {
        console.error("Error fetching restaurant detail: ", error);
      }
    };
    fetchRestaurant();
  }, []);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h4 className="text-xl font-medium">Restaurant Detail</h4>
        <ol className="hidden md:flex items-center whitespace-nowrap min-w-0 gap-2">
          <li className="text-sm">
            <a
              href="#"
              className="flex items-center gap-2 align-middle text-default-800 transition-all leading-none hover:text-primary-500"
            >
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
          src={restaurant.images?.cover}
          alt="Restaurant"
          className="w-full h-[100px] object-cover"
        />

        <div className="flex md:items-end items-center gap-3 md:-mt-14">
          <img
            src={restaurant.images?.logo}
            alt="Logo"
            className="w-28 h-28 bg-default-50 rounded-full"
          />
          <div>
            <h4 className="text-base font-medium text-default-800 mb-1">
              {restaurant.name}
            </h4>
            <p className="text-sm text-default-600">
              Since {restaurant.createdAt}
            </p>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 grid-cols-1 gap-6 h-[1000px]">
        <div className="xl:col-span-2 ">
          <div className="p-6 rounded-lg border border-default-200 mb-6 gap-3 h-full">
            <Menu isLazy>
              <MenuButton>
                <Flex className="items-center gap-2 border-2 border-[#ccc] p-2 rounded-md">
                  <Text>Sort by</Text>
                  <Box><LuArrowDown/></Box>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>Last 7 days</MenuItem>
                <MenuItem>Last Month</MenuItem>
                <MenuItem>Last Year</MenuItem>
              </MenuList>
            </Menu>
            <div>
              <BarLineChart />
            </div>
          </div>
        </div>

        <div className="xl:col-span-1">
          <div className="p-6 rounded-lg border border-default-200 mb-6 h-full">
            <div className="font-bold text-xl text-center border-b border-default-200 pb-2 mb-4">
              OWNER PERSONAL DETAIL
            </div>
            <div className="px-6 py-5">
              <table className="w-full h-[350px]">
                <tbody>
                  <tr>
                    <td className="text-start text-base font-medium">
                      Owner Name:
                    </td>
                    <td className="text-start">{restaurant.userId?.name}</td>
                  </tr>
                  <tr>
                    <td className="text-start text-base font-medium">Email:</td>
                    <td className="text-start">{restaurant.email}</td>
                  </tr>
                  <tr>
                    <td className="text-start text-base font-medium">
                      Contact No:
                    </td>
                    <td className="text-start">+(123) 456 7890</td>
                  </tr>
                  <tr>
                    <td className="text-start text-base font-medium">
                      Location:
                    </td>
                    <td className="text-start">{restaurant.location}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Center>
              <Button variant={"outline"}>Edit Restaurant</Button>
            </Center>
          </div>
        </div>

        <div className="xl:col-span-3">
          <div className="p-6 rounded-lg border border-default-200 mb-6">
            <div>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6 overflow-hidden border-default-200 w-full">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/20 text-primary h-16 w-16"></div>
                    <div className="">
                      <p className="text-base text-default-500 font-medium mb-1">
                        Food Delivered
                      </p>
                      <h4 className="text-2xl text-default-950 font-semibold mb-2">
                        50
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
                        {restaurant.totalSales}
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
              <ProductList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
